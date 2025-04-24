// Routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCourse,
  getMyCourses,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createCourse", authMiddleware, createCourse);
router.get("/myCourses", authMiddleware, getMyCourses); // ✅ Add this route

module.exports = router;
