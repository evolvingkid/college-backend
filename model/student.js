const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const StudentModel = new mongoose.Schema({
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
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
}, {
    timestamps: true
});

StudentModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Program = mongoose.model('student', StudentModel, 'student');