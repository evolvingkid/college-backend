const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const examModel = new mongoose.Schema({
    name: { type: String },
    date: {
        type: Date,
    },
    batch : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Batch',
    },
    maxmark: { type: Number },
    minMark: { type: Number },
});

examModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Exam = mongoose.model('examModel', examModel);

