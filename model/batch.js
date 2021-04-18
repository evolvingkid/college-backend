const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const BatchModel = new mongoose.Schema({

    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    currentActiveSem: {
        type: Number
    },
    sem: [
        {
            name: {
                type: Number
            },
            staringDate: {
                type: Date
            },
            endingDate: {
                type: Date
            }
        }
    ],
    program: { type: mongoose.Schema.Types.ObjectId },
});

BatchModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Batch = mongoose.model('Batch', BatchModel);