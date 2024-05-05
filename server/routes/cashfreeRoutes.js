const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { newOrderId } = require("../controlllers/paymentController")
const router = express.Router();

router.post("/payment", jwtVerify, newOrderId );


module.exports = router;