const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ExamHallModel = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  maxCount: { type: Number },
  usedCount: { type: Number },
  usedAnsSheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExamAnsSheetModel",
  },
});

ExamHallModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = ExamHall = mongoose.model("ExamHallModel", ExamHallModel);

