const express = require("express");
const router = express.Router();
const  jwtVerify  = require("../middlewares/authMiddleware");
const { addToCart, getCartItems, deleteCart, deleteCartItem } = require("../controlllers/cartController");

router.post("/add", jwtVerify, addToCart);
router.get("/all", jwtVerify, getCartItems);
router.delete("/:cart", jwtVerify, deleteCart)
router.delete("/product/:productId", jwtVerify, deleteCartItem)





module.exports = router;