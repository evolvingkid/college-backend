const User = require('../model/user');
const { mainUserEnums } = require('../config/enums')
const bcrypt = require('bcrypt');

exports.listUsers = async (req, res) => {

    try {
        const userData = await User.find();

        res.json({
            sucess: true, data: userData
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error Occured"
        });

    }
}

exports.deleteUser = async (req, res) => {

    try {

        await User.deleteOne({ _id: req.userIDData });

        res.json({
            sucess: true,
            msg: "user is deleted"
        });

    } catch (error) {

        return res.status(500).json({
            msg: "Error Occured"
        });

    }
}

exports.userPasswordChange = async (req, res) => {

    try {

        const userData = req.user;
        const { currentPassword, newPassword } = req.body;

        bcrypt.compare(currentPassword, userData.password, async function (err, result) {

            if (!result) {
                return res.status(403).json({ msg: 'User password is wrong' });
            }

            bcrypt.hash(newPassword, 10, async function (err, hash) {

                await User.updateOne({ _id: userData._id }, { password: hash });

                return res.json({ msg: "User Password change" });

            });



        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error Occured"
        });
    }

}

exports.userByID = async (req, res, next, id) => {

    const userData = await User.findOne({ _id: id });

    if (!userData) return res.status(403).json({
        status: false,
        msg: "User is not found"
    });

    req.userIDData = userData;

    next();

}

exports.userPermission = (req, res, next) => {

    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin) {
            flag++;
        }
    });

    if (flag == 0) return res.status(401).json({
        msg: "This is user is not Authorized"
    });

    next();
}