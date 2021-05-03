const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const EventsModel = new mongoose.Schema({

    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    scheduleDate: {
        type: Date,
        default: Date.now
    },
    isPrivate: {
        type: Boolean,
        default : false
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileModel"
    },
    orginizers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    exteranlPartcipants: [
        {
            name: { type: String },
            contact: { type: String }
        }
    ]
});

EventsModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Events = mongoose.model('Events', EventsModel);