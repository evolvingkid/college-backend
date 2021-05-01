const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ExamAnsSheetModel = new mongoose.Schema({
  ansSheetNo: {
    type: Number,
  },
  examHall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExamHallModel",
  },
  date: {
    type: date,
  },
});

ExamAnsSheetModel.plugin(uniqueValidator, {
  message: "{PATH} already exists!",
});

module.exports = ExamAnsSheet = mongoose.model(
  "ExamAnsSheetModel",
  ExamAnsSheetModel
);
