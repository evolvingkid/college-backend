const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DepartmentModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hods: [
        {
            hod: {
                type: mongoose.Schema.Types.ObjectId,
                requird: true,
                ref: "user"
            },
            startYear : {
                type : Date,
                required : true
            },
            endYear : {
                type : Date
            }
        },
    ],
    startYear: {
        type: Date,
        required: true,
    },
});

DepartmentModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Department = mongoose.model('DepartmentModel', DepartmentModel);