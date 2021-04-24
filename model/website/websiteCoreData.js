const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CoreDATA = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
    },
    indentifier: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        title: {
            type: String
        },
        img: {
            type: String
        },
        body: {
            type: String
        }
    },
    collectionOfDatas:
        [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "CoreData"
            }
        ],
    type: {
        type: String,
        enum: ['WEBSITE', 'SINGLEDATA', 'COLLECTIONOFDATA', 'NONE']
    }

});


CoreDATA.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = CoreData = mongoose.model('CoreData', CoreDATA);