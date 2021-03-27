const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const CourseModel = new mongoose.Schema({
    courseid: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    program: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "PrograModel" },
    startingyear: { type: Number, required: true },
    isvalid: { type: Boolean },
    examdates: [{ type: String }],
});

CourseModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = Course = mongoose.model('courseModel', CourseModel);
