const mongoose = require('mongoose');
const Product = require('./models/productSchema'); // Assuming Product model is defined in models/Product.js
const connectDB = require("./config/mongoDB");

// Connect to MongoDB
connectDB();


// Default data to push
const defaultData = 
    [{
 
        "title": "Organic Vermicompost",
        "brand": "TrustBasket",
        "description": "TrustBasket Organic Vermicompost Fertilizer Manure For Plants 5 Kg",
        "image": "https://i.imgur.com/igPvUCr.jpg",
        "credits": 369
      },
      {
      
        "title": "Farming Gloves",
        "brand": "FreshDcart",
        "description": "FreshDcart Heavy Duty Garden Farming Gloves Washable with Right Hand Fingertips ABS Claws for Digging and Gardening (Free Size, Green)(Acrylonitrile Butadiene Styrene, pack of)",
        "image": "https://i.imgur.com/4lKsnEp.jpg",
        "credits": 189
      },
      {
        "title": "Motor Sprayer Pump",
        "brand": "Neptune",
        "description": "Neptune Simplify Farming High Pressure Triplex Cylinders Pump Agricultural Motor Sprayer Pump HTP/Tractor Mounted Sprayer (Htp Gold Plus)",
        "image": "https://i.imgur.com/2bGKUmi.jpg",
        "credits": 7344
      },
      {
        "title": "Gardening Hand Tools",
        "brand": "TrustBasket",
        "description": "TrustBasket Gardening Hand Tools Set - 5 Pcs (Cultivator, Big and Small Trowel, Weeder, Fork) | Gardening Tools for Home Garden | Durable Plant Tool Kit | Farming Tools",
        "image": "https://i.imgur.com/2FsD9DK.jpg",
        "credits": 299
      },
      {
        "title": "Sun Protection Green",
        "brand": "ZHENGTU",
        "description": "ZHENGTU Sun Protection Green Shade Net Balcony Green Plastic shadnet Agriculture Boundery Terrace Farming Net Gardening Net,UV Stabilized Agro Net 50% Shade (3x50m)",
        "image": "https://i.imgur.com/VVj4VGj.jpg",
        "credits": 790
      },
      {
        "title": "Grow Bags",
        "brand": "ORGANIC BAZAR",
        "description": "ORGANIC BAZAR 12x12 Grow Bags, Pack of 10, UV Protected Round Green HDPE Plant Bags for Home Garden",
        "image": "https://i.imgur.com/p5X3jky.jpg",
        "credits": 690
      },
      {
        "title": "Natural Cocopeat",
        "brand": "Oriley",
        "description": "Oriley 5 Kg 100% Natural Cocopeat Block for Garden Plants Organic Agricultural Compost Coco Peat for Indoor & Outdoor Fertilizer Kitchen Terrace Gardening Khaad (Expands Upto 75 litres of Powder)",
        "image": "https://i.imgur.com/Y9h0FU9.jpg",
        "credits": 249
      },
      {
        "title": "Neem Oil",
        "brand": "GOLD DUST",
        "description": "GOLD DUST Neem Oil For Plant, (Concentrated 1 Litre), Neem Oil for Plants Insects Spray, Organic Substitute of Pesticide for Plants Home Garden, Neem Oil For Plants, Mealy Bug Spray",
        "image": "https://i.imgur.com/pcNiI8b.jpg",
        "credits": 609
      },
      {
        "title": "Coriander Vegetable Seeds",
        "brand": "UGAOO",
        "description": "UGAOO Coriander Vegetable Seeds (Green, Pack of 6g)",
        "image": "https://i.imgur.com/ToiJWBH.jpg",
        "credits": 129
      },
      {
        "title": "Food Fertilizer",
        "brand": "UGAOO",
        "description": "UGAOO Plant Food Fertilizer Sticks For All Home Garden Indoor & Outdoor Plants - Pack Of 24",
        "image": "https://i.imgur.com/dUg9B8n.jpg",
        "credits": 229
      },
      {
        
        "title": "Cherry Tomato Vegetable Seeds",
        "brand": "UGAOO",
        "description": "UGAOO Cherry Tomato Vegetable Seeds (Red, Pack of 200mg, 50 Seeds)",
        "image": "https://i.imgur.com/x11Zsya.jpg",
        "credits": 93
      },
      {
        "title": "Herbs",
        "brand": "UGAOO",
        "description": "UGAOO Herb Seeds Combo Of Italian Basil, Oregano, Parsley",
        "image": "https://i.imgur.com/Ei6FxoQ.jpg",
        "credits": 236
      }];

// Function to populate the database
async function populateDB() {
  try {
    await db.dropDatabase(); // Optional: Clear existing data
    const products = await Product.insertMany(defaultData);
    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    mongoose.disconnect(); // Close the connection
  }
}

// Run the population script
populateDB();
