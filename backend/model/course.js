const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    subjectName: { type: String, required: true },
    deadline: { type: Date, required: true },
    chapters: { type: Number, required: true },
    task: { type: String, required: true },
    pendingChapters: { type: Number, required: true }, // ✅ just required
    completedChapters: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
