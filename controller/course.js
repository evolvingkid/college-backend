const CourseModel = require('../model/course');
const { mainUserEnums } = require('../config/enums');

exports.createCourse = async (req, res) => {
    try {

        const { courseid, name, program, startingyear, isvalid, examDate } = req.body;

        const course = await CourseModel({
            courseid: courseid,
            name: name,
            program: program,
            startingyear: startingyear,
            isvalid: isvalid
        });

        await course.save();


        return res.status(201).json({ msg: "Course created", data: course })
    } catch (error) {

        if (error.errors.name) {
            return res.status(403).json({
                msg: error.errors.name.properties.message
            });
        }

        if (error.errors._id) {
            return res.status(403).json({
                msg: error.errors.name.properties.message
            });
        }

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        })

    }
}

exports.courseList = async (req, res) => {

    try {
        const courseData = await CourseModel.find().populate({
            path: "program",
            populate: {
                path: "departmentID"
            }
        });

        return res.json({ data: courseData });
    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });

    }

}

exports.courseEdit = async (req, res) => {

    try {
        let databaseEdit = req.body;
        const courseID = req.course._id;
        await CourseModel.updateOne({ _id: courseID }, { $set: databaseEdit });

        return res.json({ msg: "Course Updated" });
    } catch (error) {

        return res.json({ status: false, msg: "Error Occured" });

    }

}

exports.courseDelete = async (req, res) => {

    try {
        const courseID = req.course;
        await CourseModel.deleteOne({ _id: courseID });

        return res.json({
            status: true,
            msg: "Course is Deleted",
        });

    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });

    }
}

exports.AddExamDate = async (req, res) => {

    const { examDate } = req.body;
    const courseID = req.course._id;
    const dataBase = { examdates: examDate };
    await CourseModel.updateOne({ _id: courseID }, { $push: dataBase });

    return res.json({ msg: "new Exam Date Added" });
}


exports.courseByID = async (req, res, next, id) => {

    try {
        const courseData = await CourseModel.findOne({ _id: id });

        if (!courseData) return res.status(403).json({ status: false, msg: "Course not found" });

        req.course = courseData;

        next();
    } catch (error) {

        return res.status(500).json({ msg: "Error Occured" });
    }

}

exports.coursePermmison = (req, res, next) => {
    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin || element == mainUserEnums.course) {
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