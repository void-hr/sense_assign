const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");

const addToCart = async (req, res, next) => {
  try {
    const { productId, userID, quantity } = req.body;
    if (!productId || !userID) {
      return res.status(400).json({ message: 'Bad request', status: 'ERROR' });
    }

    let cart = await Cart.findOne({ user: userID });
    if (!cart) {
      cart = new Cart({ user: userID, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found', status: 'ERROR' });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex];
      existingItem.quantity = quantity ? parseInt(quantity, 10) : existingItem.quantity + 1;
      cart.items.splice(existingItemIndex, 1, existingItem);
    } else {

      const newItem = {
        product: productId,
        title: product.title,
        brand: product.brand,
        description: product.description,
        credits: product.credits,
        image: product.image,
        quantity: quantity ? parseInt(quantity, 10) : 1,
      };

      cart.items.push(newItem);
    }

    cart.bill = cart.items.reduce(
      (total, item) => total + item.credits * item.quantity,
      0
    );

    const cartData = await cart.save();

    return res.status(200).json({
      message: 'Product added to cart successfully',
      cartData,
      status: 'SUCCESS',
    });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 'ERROR' });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userID = req.body.userID;

    const cart = await Cart.findOne({ user: userID });

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      cart,
      status: "SUCCESS",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "ERROR",
    });
  }
}


const deleteCart = async (req, res) => {

  try {
    const cartId = req.params.cart;

    if (!cartId) {
      return res.status(400).json({ message: "Invalid Cart ID", status: "ERROR" });
    }

    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found", status: "ERROR" });
    }

    return res.status(200).json({
      message: "Cart deleted successfully",
      deletedCart,
      status: "SUCCESS",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "ERROR",
    });
  }
}


const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userID } = req.body;
    let cart = await Cart.findOne({ user: userID });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', status: 'ERROR' });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    cart.bill = cart.items.reduce(
      (total, item) => total + item.credits * item.quantity,
      0
    );

    const updatedCart = await cart.save();

    return res.status(200).json({
      message: 'Item removed from cart successfully',
      updatedCart,
      status: 'SUCCESS',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', status: 'ERROR' });
  }
};


module.exports = { addToCart, getCartItems, deleteCart, deleteCartItem };
