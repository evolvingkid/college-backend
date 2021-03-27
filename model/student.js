const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const StudentModel = new mongoose.Schema({
    name: { type: String, required: true },
    rollnumber: { type: Number, required: true },
});

ProgramModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Program = mongoose.model('studentModel', StudentModel);