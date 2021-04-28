const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BannerModel = new mongoose.Schema({
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FileModel",
  },
  order: {
    type: Number,
    default: 0,
  },
});

BannerModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Banner = mongoose.model("BannerModel", BannerModel);
