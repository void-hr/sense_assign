const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    items: [
      {
          product: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: "Product",
          },
          image: {
              type: String,
              required: true,
          },
          quantity: {
              type: Number,
              required: true,
              default: 1,
          },
          credits: {
              type: Number,
              required: true,
          },
      },
  ],

  bill: {
    type: Number,
    required: true,
    default: 0,
},
    
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
