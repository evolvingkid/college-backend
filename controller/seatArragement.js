const Course = require("../model/course");
const User = require("../model/user");
const Examhall = require("../model/examhall");
const SeatArrangemnet = require("../model/seatArragement");
const { seatArragmentprintOut } = require("../services/seatArragment")

exports.seatArragemnetList = async (req, res) => {
  const query = req.query;

  const arrangeData = await seatArragmentprintOut(query);

  return res.json({ data: arrangeData });
};

exports.seatArragemnet = async (req, res) => {
  const { date } = req.body;
  const examdate = new Date(date);

  console.log(date);

  // * acess course
  const courseData = await courseWithDate(examdate);

  console.log(`adasd${courseData}`);

  if (!courseData.length) {
    return res.status(400).json({ msg: "Their is no exam in this date" });
  }

  let batches = [];

  for (let index = 0; index < courseData.length; index++) {
    batches.push({
      id: courseData[index].activeExam[0].batch,
      course: courseData[index]._id,
    });
  }

  // * acess student
  let student = [];

  for (let index = 0; index < batches.length; index++) {
    const studentData = await studentsWithBatch(batches[index].id);

    for (let j = 0; j < studentData.length; j++) {
      student.push({
        id: studentData[j]._id,
        batch: batches[index].id,
        course: batches[index].course,
      });
    }
  }

  if (!student.length) {
    return res.status(400).json({ msg: "Their is no student for this exam" });
  }

  // * exam hall ordering
  let examHallData = await Examhall.find();
  let examCount = 0;
  let usedHall = [];

  for (let index = 0; index < examHallData.length; index++) {
    examCount = examCount + examHallData[index].usedCount;
    let examHallID = examHallData[index].usedCount;
    let stength = parseInt(examHallData[index].usedCount / 2);
    usedHall.push({
      examHallID: false,
      splitStergnth: stength,
      splitLegth: 2,
      id: examHallData[index]._id,
    });
  }

  if (examCount < student.length) {
    return res
      .status(400)
      .json({ msg: "Their is no enough seat for all students" });
  }

  let currentExamhall = 0;

  let seatArragment = [];

  //* exam date

  for (let index = 0; index < student.length; index++) {
    if (usedHall.length <= currentExamhall) {
      currentExamhall = 0;
    }

    if (usedHall[currentExamhall].splitStergnth == 0) {
      if (usedHall[currentExamhall].splitLegth !== 0) {
        usedHall[currentExamhall].splitLegth ==
          usedHall[currentExamhall].splitLegth - 1;
      } else {
        currentExamhall++;
        index--;
        continue;
      }

      usedHall[currentExamhall].splitStergnth = parseInt(
        examHallData[currentExamhall].usedCount /
        usedHall[currentExamhall].splitLegth
      );
      currentExamhall++;
    }

    seatArragment.push({
      examhall: examHallData[currentExamhall]._id,
      student: student[index].id,
      date: examdate,
      batch: student[index].batch,
      course: student[index].course,
    });

    usedHall[currentExamhall].splitStergnth =
      usedHall[currentExamhall].splitStergnth - 1;
  }

  const seatArragementData = await SeatArrangemnet.insertMany(seatArragment);

  return res.json({ data: seatArragementData });
};

async function studentsWithBatch(batchID) {
  const studentData = await User.aggregate([
    {
      $lookup: {
        from: "student",
        localField: "student",
        foreignField: "_id",
        as: "student",
      },
    },
    { $match: { student: { $exists: true, $not: { $size: 0 } } } },
    {
      $match: { "student.batch": batchID },
    },
  ]);

  return studentData;
}

async function courseWithDate(examdate) {
  console.log(examdate);

  const courseData = await Course.aggregate([
    {
      $lookup: {
        from: "exammodels",
        localField: "activeExamDate",
        foreignField: "_id",
        as: "activeExam",
      },
    },
    {
      $match: {
        "activeExam.date": examdate,
      },
    },
  ]);

  return courseData;
}

