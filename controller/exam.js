const Course = require('../model/course');
const Exam = require('../model/exam');
const mongoose = require('mongoose');

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

exports.examList = async (req, res) => {

    let aggregateData = [
        {
            "$lookup": {
                "from": 'exammodels',
                "localField": "activeExamDate",
                "foreignField": "_id",
                "as": "activeExamData",
            }
        },
        {
            "$lookup": {
                "from": 'exammodels',
                "localField": "examsHistory",
                "foreignField": "_id",
                "as": "examsHistoryData",
            }
        },
        { "$match": { "activeExamData": { $exists: true, $not: { $size: 0 } } } },
        { "$match": { "examsHistoryData": { $exists: true, $not: { $size: 0 } } } },
    ];

    let { activeExamDate, examHistory, activeExamBatch, examhistoryExamBatch,  } = req.query;

    if (activeExamDate) {

        console.log(activeExamDate);
        let activeDate = new Date(activeExamDate);
        console.log(activeDate);
        aggregateData.push({ "$match": { "activeExamData.date": activeDate } });
    }

    if (examHistory) {

        let examHistoryeDate = new Date(examHistory);
        aggregateData.push({ "$match": { "examsHistoryData.date": examHistoryeDate } });
        
    }

    if (activeExamBatch) {

        let activeExamBatchID = mongoose.Types.ObjectId(activeExamBatch);
        aggregateData.push({ "$match": { "activeExamData.batch": activeExamBatchID } });
        
    }

    if (examhistoryExamBatch) {

        let examhistoryExamBatchID = mongoose.Types.ObjectId(examhistoryExamBatch);
        aggregateData.push({ "$match": { "examsHistoryData.batch": examhistoryExamBatchID } });
        
    }


    const courseData = await Course.aggregate(aggregateData);

    return res.json({ data: courseData });

}