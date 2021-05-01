const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CourseModel = new mongoose.Schema({
  courseid: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    unique: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PrograModel",
  },
  startingyear: {
    type: Number,
    required: true,
  },
  isvalid: {
    type: Boolean,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  syllabus: {
    type: String,
  },
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  activeExamDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "examModel",
  },
  examsHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "examModel",
    },
  ],
});

CourseModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Course = mongoose.model("courseModel", CourseModel);
