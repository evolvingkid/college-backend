const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const examModel = new mongoose.Schema({
    name: { type: String },
    date: {
        type: Date,
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
    },
    maxmark: { type: Number },
    minMark: { type: Number },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel',
    },
    isActive: { type: Boolean, default: false },
    isCancelled: { type: Boolean, default: false },
    type : {
        type: String,
        enum : ['Writtern Exam', 'Lab Exam'],
        default : "Writtern Exam"
    }
});

examModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Exam = mongoose.model('examModel', examModel);

