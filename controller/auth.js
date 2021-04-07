require('dotenv').config();

const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  { mongoDB } = require('../error/mongoDB');

//! base  API
exports.signup = async (req, res) => {

    try {
        const body = req.body;
        let userData = new UserModel(body);

        await userData.save();

        return res.status(201).json({
            msg: "user Created",
            data: userData
        });

    } catch (error) {

        const errorMsg = mongoDB(error);

        if (errorMsg.length) {
            return res.status(403).json({
                msg : errorMsg[0],
                error: errorMsg
            });
        }

        return res.status(500).json({
            msg: "Error Occured"
        });

    }
}

exports.signin = async (req, res) => {
    try {

        let userData = await UserModel.findOne({ email: req.body.email });

        if (userData) {
            bcrypt.compare(req.body.password, userData.password, function (err, result) {

                if (!result) {
                    return res.status(403).json({ msg: 'User credentials is wrong' });
                }

                // * for JWT token
                const username = { email: userData['email'], password: userData['password'] };
                const acessToken = jwt.sign(username, process.env.ACESS_TOKEN_SECRET);

                return res.json({
                    sucess: true,
                    data:
                    {
                        user: userData,
                        acesstoken: acessToken
                    }
                });

            });
        }else{
            return res.status(401).json({
                msg: "User not found"
            });
        }

    } catch (error) {

        return res.status(403).json({
            msg: "Error Occured"
        });

    }

}


// ! middlewares

exports.jwtAuthVerification = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({
        status: false,
        msg: "This is user is not Authorized"
    });


    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, async (err, username) => {

        if (err) return res.status(401).json({
            status: false,
            msg: "This is user is not Authorized"
        });

        const userData = await UserModel.findOne({ email: username.email });

        console.log(userData);

        if (!userData) return res.status(401).json({
            status: false,
            msg: "This is user is not Authorized"
        });

        req.user = userData;

        next();
    });

}