const Course = require('../model/course');
const Exam = require('../model/exam');

exports.createExam = async (req, res) => {

    try {
        const courseData = req.course;
        const body = req.body;
        body.course = courseData._id;
        body.isActive = true;

        const examData = Exam(body);

        await Promise.all([
            Course.updateOne({ _id: courseData._id }, { activeExamDate: examData._id, $push: { examsHistory: examData._id } }),
            examData.save(),
            Exam.updateOne({ _id: examData._id }, { isActive: false })
        ])

        return res.json({ msg: "Exam Added", data: examData });

    } catch (error) {
        
        return res.status(500).json({ msg: "Error Occured" })
    }
}

exports.examList = async (req, res) => {

    const query = req.query;

    const examData = await Exam.find(query)
    .populate("batch").populate("course");

    return res.json({ data: examData });
}