const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const EventsModel = new mongoose.Schema({

    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId , 
        ref: "Product"
    },
    participants:[
        {
            name:{
                type:String,
            },
            value:{
                type:Number
            }
        }
    ]
});

EventsModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = Events = mongoose.model('Events', EventsModel);