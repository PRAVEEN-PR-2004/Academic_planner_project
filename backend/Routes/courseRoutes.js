const express = require("express");
const router = express.Router();
const {
  createCourse,
  getMyCourses,
  markCourseAsCompleted,
  deleteCourse, // ✅ import the controller
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createCourse", authMiddleware, createCourse);
router.get("/myCourses", authMiddleware, getMyCourses);
router.patch("/courses/:id/complete", authMiddleware, markCourseAsCompleted);
router.delete("/courses/:id", authMiddleware, deleteCourse); // ✅ new delete route

module.exports = router;
