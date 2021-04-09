const User = require('../model/user');
const { mainUserEnums } = require('../config/enums')
const bcrypt = require('bcrypt');
const Student = require('../model/student');

exports.listUsers = async (req, res) => {

    try {
        const userData = await User.find()
            .populate('student').populate('employee');

        for (let index = 0; index < userData.length; index++) {
            userData[index].hashed_password = undefined;
            userData[index].salt = undefined;
        }

        return res.json({
            sucess: true, data: userData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            error: "Error Occured"
        });
    }
}

exports.listTeachers = async (req, res) => {

    let { department } = req.query;

    let aggregateData = [
        {
            "$lookup": {
                "from": 'employees',
                "localField": "employee",
                "foreignField": "_id",
                "as": "employee",
            }
        },
        { "$match": { "employee.type": 'Teachers' } },
    ];

    if (department) {
        console.log("department");
        aggregateData.push(
            {
                "$lookup": {
                    "from": 'departmentmodels',
                    "localField": "employee.department",
                    "foreignField": "_id",
                    "as": "departmentdata",
                }
            }
        );
        aggregateData.push({ "$match": { "departmentdata.name": "BCAS" } },)

    }

    const teacherData = await User.aggregate(aggregateData);

    for (let index = 0; index < teacherData.length; index++) {
        teacherData[index].hashed_password = undefined;
        teacherData[index].salt = undefined;
        teacherData[index].aadhar = undefined;
    }

    return res.json({
        sucess: true, data: teacherData
    });

}


exports.deleteUser = async (req, res) => {

    try {
        const userData = req.userIDData;
        await Promise.all([Student.deleteOne({ _id: userData.student })
            , User.deleteOne({ _id: userData._id })]);

        res.json({
            sucess: true,
            msg: "user is deleted"
        });

    } catch (error) {

        return res.status(500).json({
            error: "Error Occured"
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
            error: "Error Occured"
        });
    }

}

exports.userByID = async (req, res, next, id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, error: "This user is not acceptable" });
        }

        const userData = await User.findOne({ _id: id });

        if (!userData) return res.status(403).json({
            status: false,
            error: "User is not found"
        });

        req.userIDData = userData;

        next();
    } catch (error) {
        console.log(`userbyID ${error}`);

        return res.status(500).json({ status: false, error: "Error occured" });

    }



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