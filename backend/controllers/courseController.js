const Course = require("../model/course");

exports.createCourse = async (req, res) => {
  try {
    const course = new Course({ ...req.body, user: req.user.id });
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating course", error: err.message });
  }
};
// PATCH /courses/:id/complete
exports.markCourseAsCompleted = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, user: userId },
      { status: true },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating course", error: err.message });
  }
};

// courseController.js
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: err.message });
  }
};
