const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const StudentModel = new mongoose.Schema({
    name: { type: String, required: true },
    rollnumber: { type: Number, required: true },
    regNumber: { type: Number },
    phoneNumber: { type: Number },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "PrograModel" },
    password: { type: String },
    email: { type: String },
    supplimentaryExam: [{ type: mongoose.Schema.Types.ObjectId, ref: "courseModel" }],
    examyear: { type: Number },
});

StudentModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Program = mongoose.model('studentModel', StudentModel);