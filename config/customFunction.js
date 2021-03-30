const Crypto = require('crypto');

exports.randomNumber = (max)=>{
    return Math.floor(Math.random() * Math.floor(max));
}

exports.randomString = (size) =>{
    return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}