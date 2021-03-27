const { mainUserEnums } = require('../config/enums');
const Student = require('../model/student');

exports.createStudent = async (req, res) => {

    try {
        const databaseBody = req.body;
        const StudentData = await Student(databaseBody);
        StudentData.save();

        return res.status(201).json({ msg: "Student is created", data: StudentData });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error Occured" });
    }

}

exports.listStudent = async (req, res) => {
    try {
        const studentData = await Student.find().populate({
            path: "program",
            populate: {
                path: "departmentID"
            }
        });

        return res.json({ status: true, data: studentData });

    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });

    }
}

exports.editStudent = async (req, res) => {
    try {
        const database = req.body;
        const studentID = req.student._id;
        await Student.updateOne({ _id: studentID }, { $set: database });

        return res.json({ msg: "Student Edited" });

    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error Occured" });
    }
}

exports.deleteStudent = async (req, res) => {

    try {
        const studentID = req.student._id;
        await Student.deleteOne({ _id: studentID });

        return res.json({ status: true, msg: "Student Delete" });

    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });
    }

}

exports.studentByID = async (req, res, next, id) => {
    try {
        const studentData = await Student.findOne({ _id: id });

        if (!studentData) return res.status(401).json({
            msg: "This Department doesn't exist"
        });

        req.student = studentData;

        next();
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error Occured" });
    }
}


exports.studentPermission = async (req, res, next) => {
    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin || element == mainUserEnums.student) {
            flag++;
        }
    });

    if (flag == 0) return res.status(401).json({
        msg: "This is user is not Authorized"
    });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`programPermission API : uses approximately ${used} MB`);

    next();
}