const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const ProgramModel = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    departmentID: { type: String, required: true },
});

ProgramModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = Program = mongoose.model('PrograModel', ProgramModel);