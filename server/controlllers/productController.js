const Product = require("../models/productSchema");
const allProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    const products = await Product.find(filter);
    return res.json({
      message: "Products retrieved successfully",
      products,
      status: "SUCCESS",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "ERROR",
    })
  }

}

const getProductDetail = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        status: 'ERROR',
      });
    }

    return res.status(200).json({
      message: 'Product details fetched successfully',
      status: 'SUCCESS',
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "ERROR",
    })
  }
}


module.exports = { allProducts, getProductDetail };