const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // <-- Import your config file
const authRoutes = require("./Routes/authRoutes");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
