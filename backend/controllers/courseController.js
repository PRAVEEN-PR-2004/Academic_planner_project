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
exports.reduceChapterCount = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findOne({ _id: courseId, user: req.user.id });
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.chapters > 0) {
      course.chapters -= 1;
      await course.save();
      res.status(200).json({ message: "Chapter marked complete", course });
    } else {
      res.status(400).json({ message: "No more chapters to mark complete" });
    }
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
