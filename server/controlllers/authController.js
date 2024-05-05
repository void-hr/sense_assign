const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const registerAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Bad request", status: "ERROR" });
    }
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", status: "ERROR" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
    });
    const jwtToken = await jwt.sign(
      { userID: newUser._id },
      process.env.TOKEN_SECRET
    );
    return res.json({
      message: "User created successfully",
      token: jwtToken,
      firstName: newUser?.firstName,
      lastName: newUser?.lastName,
      status: "SUCCESS",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "ERROR" });
  }
};

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Bad request", status: "ERROR" });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", status: "ERROR" });
    } else if (!(await bcrypt.compare(password, userDetails.password))) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", status: "ERROR" });
    }

    const jwtToken = jwt.sign(
      { userID: userDetails._id },
      process.env.TOKEN_SECRET
    );
    res.json({
      message: "Logged In Successfully",
      token: jwtToken,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      status: "SUCCESS",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "ERROR" });
  }
};

const addCredits = async (req, res) => {
  const { userID, creds } = req.body;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.credits += creds;
    await user.save();

    res.status(200).json({ message: 'Credits added successfully', credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const fetchCredits = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { registerAccount, loginAccount, addCredits, fetchCredits };
