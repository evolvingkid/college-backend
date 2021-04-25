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

    try {
        const query = req.query;

        const examData = await Exam.find(query)
            .populate("batch").populate("course");

        return res.json({ data: examData });
    } catch (error) {

        return res.status(500).json({ msg: "Error Occured" });

    }
}

exports.examEdit = async (req, res) => {

    try {
        let exam = req.body;
        const examData = req.examData;

        exam.batch = examData.batch;
        exam.date = examData.date;
        exam.isActive = examData.isActive;
        exam.type = examData.type;
        exam.isCancelled = examData.isCancelled;

        await Exam.updateOne({ _id: examData._id }, exam);

        return res.json({ msg: " Exam is updated" });

    } catch (error) {

        return res.json({ error: "Error Occured" });

    }

}

exports.examCancel = async (req, res) => {

    try {

        const examData = req.examData;

        await Exam.updateOne({ _id: examData._id }, { isCancelled: false });

        return res.json({msg : "Exam canceled"});

    } catch (error) {

        return res.json({ error: "Error Occured" });

    }

}


exports.examByID = async (req, res, next, id) => {

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, msg: "This exam is not acceptable" });
        }

        const examData = await Exam.findOne({ _id: id });

        if (!examData) return res.status(401).json({
            msg: "This exam doesn't exist"
        });

        req.examData = examData;

        next();
    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error occured" });
    }

}