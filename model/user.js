const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');


const UsersModel = new mongoose.Schema({
  firstName: { type: String, required: true, },
  listName: { type: String, required: true },
  email: { type: String, unique: true },
  dob: { type: Date, required: true },
  aadhar: { type: String, required: true },
  communicationAddress: {
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    city : {
      type: String,
      required: true
    },
    house : {
      type: String,
      required: true,
    },
    pincode:{
      type: Number,
      required: true
    },
  },
  priviliage: [],

},
  {
    timestamps: true
  }
);

UsersModel.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UsersModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = User = mongoose.model('UsersModel', UsersModel);