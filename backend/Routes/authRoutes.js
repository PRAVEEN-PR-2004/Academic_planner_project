const express = require("express");
const router = express.Router();
const { signupUser } = require("../controllers/authController");

// Route: POST /api/signup
router.post("/signup", signupUser);

module.exports = router;
