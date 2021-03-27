const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const ProgramModel = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    departmentID: { type:  mongoose.Schema.Types.ObjectId, required: true, ref: "DepartmentModel" },
});

ProgramModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = Program = mongoose.model('PrograModel', ProgramModel);