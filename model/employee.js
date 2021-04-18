const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const EmployeeModel = new mongoose.Schema({
    secoundaryMobnumber: { type: String },
    designation: { type: String },
    qualification: [{
        title: { type: String },
        files: [{ type: String }],
        decription: { type: String }
    }],
    isAided: { type: Boolean, default: false },
    jobType: {
        type: String,
        enum: ['Traning', 'Temporary', 'Permanent', 'none'],
        default: 'none'
    },
    type: {
        type: String,
        enum: ['Teachers', 'Employee'],
        default: 'Employee'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentModel"
    }
});


EmployeeModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Program = mongoose.model('employee', EmployeeModel);