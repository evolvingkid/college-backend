const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CoreDATA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
  },
  indentifier: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  collectionOfDatas: [
    {
      order: {
        type: Number,
        default: 0,
      },
      data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoreData",
      },
    },
  ],
  feildName: {
    type: String,
  },
  type: {
    type: String,
    enum: [
      "PAGES",
      "SINGLEDATA",
      "COLLECTIONOFDATA",
      "INHERTEDDATA",
      "DOWNLOADABLE",
      "NONE",
    ],
  },
});

CoreDATA.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = CoreData = mongoose.model("CoreData", CoreDATA);
