const course = require('../model/course');
const Course = require('../model/course');
const Exam = require('../model/exam');

exports.createExam = async (req, res) => {

    try {
        const courseData = req.course;
        const body = req.body;

        const examData = Exam(body);

        await Promise.all([
            Course.updateOne({ _id: courseData._id }, { activeExamDate: examData._id }),
            Course.updateOne({ _id: courseData._id }, { $push: { examsHistory: examData._id } }),
            examData.save()
        ])


        return res.json({ msg: "Exam Added", data: examData });

    } catch (error) {

        return res.status(500).json({ msg: "Error Occured" })

    }



}