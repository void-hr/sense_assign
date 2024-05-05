const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { allProducts, getProductDetail } = require("../controlllers/productController");
const router = express.Router();

router.get("/allproducts", allProducts);
router.get("/:id", getProductDetail);


module.exports = router;