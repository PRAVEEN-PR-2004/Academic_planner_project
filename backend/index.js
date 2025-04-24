const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");

const app = express();
connectDB(); // Connect MongoDB

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes); // Use auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
