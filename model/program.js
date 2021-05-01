const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProgramModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stream: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "DepartmentModel",
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  maxintake: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isAded: {
    type: Boolean,
    required: true,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseModel",
    },
  ],
});

ProgramModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Program = mongoose.model("PrograModel", ProgramModel);

