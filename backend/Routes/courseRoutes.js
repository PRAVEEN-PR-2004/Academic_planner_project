// Routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCourse,
  getMyCourses,
  reduceChapterCount,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");
router.put("/reduceChapterCount", authMiddleware, reduceChapterCount);

router.post("/createCourse", authMiddleware, createCourse);
router.get("/myCourses", authMiddleware, getMyCourses); // ✅ Add this route

module.exports = router;
