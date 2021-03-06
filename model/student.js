const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const StudentModel = new mongoose.Schema({
    fatherName: { type: String},
    motherName: { type: String },
    income: { type: Number },
    caste: { type: String },
    religion: { type: String },
    castecatgory: {
        type: String,
        enum: ['General', 'OBC', 'SC/ST'],
        default: 'General',
    },
    rollno: { type: Number, required: true },
    collegeRollno: { type: Number, required: true },
    universityNumber: { type: Number, required: true },
    fatherOccupation: { type: String },
    motheroccupation: { type: String },
    addmissionType: {
        type: String
    },
    startingBatch: { type: Date },
    endingbatch: { type: Date },
    batch: { type: mongoose.Schema.Types.ObjectId },
    isNRI: {
        type: Boolean,
        default: false,
    },
    achivement: [],
    placement: [],
    club: [],
    education: [{
        title: { type: String },
        file: { type: String },
        decription: { type: String }
    }],
    program: [{ type: mongoose.Schema.Types.ObjectId }],
}, {
    timestamps: true
});

StudentModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = student = mongoose.model('student', StudentModel, 'student');