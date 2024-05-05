const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {  
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
        default: 100
    },
    image: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

const Product = mongoose.model('products', productSchema);
module.exports = Product;