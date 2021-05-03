const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const GalleryModel = new mongoose.Schema({

    name: { type: String },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileModel",
    },
    uploadBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

GalleryModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Gallery = mongoose.model("GalleryModel", GalleryModel);