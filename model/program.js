const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const ProgramModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "DepartmentModel"
    },
    startdate : {
        type : Date,
        reqyuired: true,
    },
    enddate : {
        type : Date
    },
    isActive: {
        type: Boolean,
        default : true
    },
    maxintake : {
        type: Number,
        required: true,
    },
    duration : {
        type: Number,
        required: true,
    },
    isAded : {
        type : Boolean,
        required: true,
    }
});

ProgramModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = Program = mongoose.model('PrograModel', ProgramModel);