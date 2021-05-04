const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const placementModel = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    reqLink: {
        type: String
    }
});

placementModel.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Placement = mongoose.model("placementModel", placementModel);