const express = require("express");
const router = express.Router();
const {
  createCourse,
  getMyCourses,
  markCourseAsCompleted,
  deleteCourse,

  decreaseChapter, // ✅ new import
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/createCourse", authMiddleware, createCourse);
router.get("/myCourses", authMiddleware, getMyCourses);
router.patch("/courses/:id/complete", authMiddleware, markCourseAsCompleted);
router.delete("/courses/:id", authMiddleware, deleteCourse); // ✅ new delete route
router.patch("/courses/:id/decreaseChapter", authMiddleware, decreaseChapter);

module.exports = router;
