const express = require("express");
const router = express.Router();
const { createCourse } = require("../controllers/courseController"); // Corrected path
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createCourse", authMiddleware, createCourse);

module.exports = router;
