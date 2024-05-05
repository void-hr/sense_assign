const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { registerAccount, loginAccount, addCredits, fetchCredits } = require("../controlllers/authController");
const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", loginAccount);
router.post('/credits/add', jwtVerify, addCredits);
router.get('/credits', jwtVerify, fetchCredits);


module.exports = router;