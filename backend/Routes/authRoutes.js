const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");
const router = express.Router();

// POST /api/signup
router.post("/signup", signupUser);

// POST /api/login
router.post("/login", loginUser);

module.exports = router;
