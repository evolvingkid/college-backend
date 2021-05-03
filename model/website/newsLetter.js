const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const NewsLettersModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    scheduledDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileModel"
    }
});

NewsLettersModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = NewsLetters = mongoose.model("NewsLettersModel", NewsLettersModel);