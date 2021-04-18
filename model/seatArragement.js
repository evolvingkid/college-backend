const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const SeatArragementModel = new mongoose.Schema({

    examhall : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'ExamHallModel'
    },
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date : {
        type : Date
    },
    batch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Batch'
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'courseModel'
    }
});


SeatArragementModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = SeatArragement = mongoose.model('seatarrangementmodel', SeatArragementModel);