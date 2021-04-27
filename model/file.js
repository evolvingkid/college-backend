const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const FileModel = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  visibility: {
    type: Boolean,
    default: false,
  },
});

FileModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Files = mongoose.model("FileModel", FileModel);

