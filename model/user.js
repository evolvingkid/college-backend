const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');


const UsersModel = new mongoose.Schema({
    name: { type: String, required:true,  },
    password: { type: String, required:true },
    email: {type: String, unique: true},
    designation : { type: String, required:true },
    priviliage : []
});

UsersModel.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err); }
      user.password = hash;
      next();
    })
  });

UsersModel.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = User = mongoose.model('UsersModel', UsersModel);