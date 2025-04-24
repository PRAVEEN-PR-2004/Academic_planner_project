const express = require("express");
const router = express.Router();
const {
  createCourse,
  getMyCourses,
  markCourseAsCompleted,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createCourse", authMiddleware, createCourse);
router.get("/myCourses", authMiddleware, getMyCourses);
router.patch("/courses/:id/complete", authMiddleware, markCourseAsCompleted); // ✅ New route

module.exports = router;
