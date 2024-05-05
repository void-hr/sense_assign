const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
    type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      default: 1000
    }
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
