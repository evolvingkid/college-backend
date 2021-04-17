const User = require('../model/user');
const { mainUserEnums } = require('../config/enums')
const bcrypt = require('bcrypt');
const Student = require('../model/student');
const { json } = require('body-parser');
const mongoose = require('mongoose');

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

    try {
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
            let departmentID = mongoose.Types.ObjectId(department);
            aggregateData.push({ "$match": { "departmentdata._id": departmentID } },)

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

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: "Error Occured"
        });
    }



}

exports.studentList = async (req, res) => {

    try {

        let studentData;
        const { startingbatch, endingbatch, program, sem, batch } = req.query;

        let aggreateData = [
            {
                "$lookup": {
                    "from": 'student',
                    "localField": "student",
                    "foreignField": "_id",
                    "as": "student",
                }
            },
            { "$match": { "student": { $exists: true, $not: { $size: 0 } } } }
        ];

        aggreateData.push({
            "$lookup": {
                "from": 'batches',
                "localField": "student.batch",
                "foreignField": "_id",
                "as": "batches",
            }
        });

        if (startingbatch) {
            let startDate = new Date(startingbatch);
            aggreateData.push({ "$match": { "student.startingBatch": { $gte: startDate } } });
        }

        if (endingbatch) {
            let endingDate = new Date(endingbatch);
            aggreateData.push({ "$match": { "student.endingbatch": { $gte: endingDate } } });
        }

        if (program) {
            let programID = mongoose.Types.ObjectId(program);
            aggreateData.push({ "$match": { "student.program": programID } });
        }

        if (sem) {
         
            aggreateData.push({ "$match": { "batches.currentActiveSem": parseInt(sem) } })
        }


        if (batch) {
            let batchID = mongoose.Types.ObjectId(batch);
            aggreateData.push({ "$match": { "student.batch": batchID } })
        }

        studentData = await User.aggregate(aggreateData);

        return res.json({ data: studentData });
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: "Error Occured"
        });

    }


}

exports.userEdit = async (req, res) => {

    const body = req.body;
    const userData = req.userIDData;

    body['profilePic'] == req.file.path;

    await User.updateOne({ _id: userData._id }, { body });

    return res.json({ msg: "user updated" });

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