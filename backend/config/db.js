const mongoose = require("mongoose");

// MongoDB URI
const dbURI =
  "mongodb+srv://praveen2004ttp:uRQdWpkmsuK2rDOa@cluster0.uuc5gqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
