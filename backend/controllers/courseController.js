const Course = require("../model/course");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, subjectName, deadline, chapters, task } = req.body;

    const course = new Course({
      courseName,
      subjectName,
      deadline,
      chapters,
      task,
      pendingChapters: chapters, // Store the number of chapters
      user: req.user.id,
    });

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
// DELETE /courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const deletedCourse = await Course.findOneAndDelete({
      _id: courseId,
      user: userId,
    });

    if (!deletedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or not authorized" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting course", error: err.message });
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
// PATCH /courses/:id/decreaseChapter
exports.decreaseChapter = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const course = await Course.findOne({ _id: courseId, user: userId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.pendingChapters > 0) {
      course.pendingChapters -= 1;
    }

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error decreasing chapter", error: err.message });
  }
};
