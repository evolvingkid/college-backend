const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 100
  },
  phone: {
    type: Number,
    trim: true,
    required: true,
    unique: 13
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  dob: {
    type: Date,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
    unique: true
  },
  communicationAddress: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  permanentAddress: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  userType: {
    type: String,
    enum: ['Student', 'Employee', 'None'],
    default: 'None',
    required: true,
  },
  permission: [],
  profilePic: {
    type: String,
  },
  adharprofilePic: {
    type: String,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,  ref: "student"
  },
  employee : {
    type: mongoose.Schema.Types.ObjectId,  ref: "employee"
  }
}, {
  timestamps: true
});

userSchema.virtual('password')

  .set(function (password) {
    console.log(password);
    this._password = password,
      this.salt = uuidv4(),
      this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this.password
  })

userSchema.methods = {

  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },


  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return "";
    }
  }
};


userSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });


module.exports = mongoose.model("user", userSchema);