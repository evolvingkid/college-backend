const mongoose = require('mongoose');
const config = require('config');
const uri = config.get('mongoURI');


const connectDB = async () => {

    try {

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });


        console.log('Mongoose DB connected');


    } catch (error) {

        console.log(error.message);

    }
}

module.exports = connectDB;
