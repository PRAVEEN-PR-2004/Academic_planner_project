const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const dbURI = process.env.MONGO_URI; // Get MongoDB URI from .env

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
