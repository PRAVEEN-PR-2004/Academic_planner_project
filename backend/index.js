const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const connectDb = require("./config/db");
// Use CORS to allow requests from your frontend
connectDb();
app.use(cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is ru nning on http://localhost:${PORT}`);
});
