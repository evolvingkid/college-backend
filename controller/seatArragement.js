const Course = require('../model/course');
const User = require('../model/user');


exports.seatArragemnet = async (req, res) => {

    const { date } = req.body;
    const examdate = new Date(date);

    const courseData = await courseWithDate(examdate);

    if (!courseData.length) {

        return res.status(400).json({ msg: "Their is no exam in this date" });
    }

    let batches = [];

    for (let index = 0; index < courseData.length; index++) {
        batches.push(courseData[index].activeExam.batch);
    }

    let student = [];

    for (let index = 0; index < batches.length; index++) {

        const studentData = await studentsWithBatch(batches[index]);

        for (let j = 0; j < studentData.length; j++) {

            student.push(studentData[index]._id);

        }

    }



    return res.json({ data: student });

}


async function studentsWithBatch(batchID) {

    const studentData = await User.aggregate([
        {
            "$lookup": {
                "from": 'student',
                "localField": "student",
                "foreignField": "_id",
                "as": "student",
            }
        },
        { "$match": { "student": { $exists: true, $not: { $size: 0 } } } },
        {
            "$match": { "student.batch": batchID }
        }

    ]);

    console.log(studentData);

    return studentData;

}


async function courseWithDate(examdate) {

    const courseData = await Course.aggregate([
        {
            "$lookup": {
                "from": 'exammodels',
                "localField": "activeExamDate",
                "foreignField": "_id",
                "as": "activeExam",
            }
        },
        {
            "$match": {
                "activeExam.date": examdate
            }
        }
    ]);

    return courseData;

}