const CourseModel = require('../model/course');
const { mainUserEnums } = require('../config/enums');
const Program = require('../model/program');

exports.createCourse = async (req, res) => {
    try {

        const body = req.body;
        const course = await CourseModel(body);
        const courseID = course._id;
        await Promise.all(
            [
                Program.updateOne({ _id: body.program }, { $push: { course: courseID } }),
                course.save()
            ]
        );

        return res.status(201).json({ msg: "Course created", data: course })
    } catch (error) {

        if (error.errors.name) {
            return res.status(403).json({
                error: error.errors.name.properties.message
            });
        }

        if (error.errors._id) {
            return res.status(403).json({
                error: error.errors.name.properties.message
            });
        }

        return res.status(500).json({
            status: false,
            error: "Error Occured",
        })

    }
}

exports.courseList = async (req, res) => {

    try {
        const courseData = await CourseModel.find().populate({
            path: "program",
            path: "teacher",
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


exports.courseByID = async (req, res, next, id) => {

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, msg: "This Course is not acceptable" });
        }

        const courseData = await CourseModel.findOne({ _id: id });

        if (!courseData) return res.status(403).json({ status: false, msg: "Course not found" });

        req.course = courseData;

        next();
    } catch (error) {

        return res.status(500).json({ msg: "Error Occured" });
    }

}
