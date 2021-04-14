require('dotenv').config();
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const { mongoDB } = require('../error/mongoDB');
const student = require('../model/student');
const Employee = require('../model/employee');
const config = require('config');


//! base  API
exports.signup = async (req, res) => {

    try {
        let body = req.body;
        let userData;
        if (body.userType === 'Student') {
            const studentData = student(body.student);
            body.student = studentData;
            userData = new UserModel(body);
            await Promise.all([studentData.save(), userData.save()]);
        }

        if (body.userType === 'Employee') {
            const employee = Employee(body.employee);
            body.employee = employee;
            userData = new UserModel(body);
            await Promise.all([employee.save(), userData.save()]);
        }

        userData.salt = undefined;
        userData.hashed_password = undefined;

        return res.status(201).json({
            msg: "user Created",
            data: userData
        });

    } catch (error) {

        const errorMsg = mongoDB(error);

        if (errorMsg.length) {
            return res.status(403).json({
                error: errorMsg[0],
                errorMsgs: errorMsg
            });
        }

        return res.status(500).json({
            error: "Error Occured"
        });

    }
}

exports.signin = async (req, res) => {
    try {

        const { email, password } = req.body;

        let userData = await  UserModel
            .findOne({ email: email })
            .populate({path: "student"}).populate('employee');

        if (!userData) {
            return res.status(400).json({
                error: "User not found"
            });
        }


        if (!userData.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password dont match"
            });
        }

        const username = { id: userData._id};

        const acessToken = jwt.sign(username, process.env.ACESS_TOKEN_SECRET);

        userData.hashed_password = undefined;
        userData.salt = undefined;

        return res.json({
            sucess: true,
            data:
            {
                acesstoken: acessToken,
                user: userData
            }
        });


    } catch (error) {

        return res.status(500).json({
            error: "Autheticate Error"
        });

    }

}


// ! middlewares

exports.jwtAuthVerification = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({
        status: false,
        error: "This is user is not Authorized"
    });


    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, async (err, username) => {
        try {
            if (err) return res.status(401).json({
                status: false,
                error: "This is user is not Authorized"
            });
    
            const userData = await UserModel.findOne({ _id : username.id });
    
            if (!userData) return res.status(401).json({
                status: false,
                error: "This is user is not Authorized"
            });
    
            req.user = userData;
    
            next(); 
        } catch (error) {
            console.log(error);
            return res.json({error: "Error Occured"}); 
        }

       
    });

}