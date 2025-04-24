const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    subjectName: { type: String, required: true },
    deadline: { type: Date, required: true },
    chapters: { type: Number, required: true },
    task: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
