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
