const SeatArragement = require("../model/seatArragement");

exports.createAttendanceDocument = async (date, courseData, examHallData) => {
  let attendanceData = await SeatArragement.find({
    date: date,
    examhall: examHallData._id,
    course: courseData._id,
  })
    .populate("course")
    .populate("examhall")
    .populate({
      path: "student",
      populate: {
        path: "student",
      },
    });

  let attendanceMarkData = {};

  attendanceMarkData.examhall = examHallData;
  attendanceMarkData.course = courseData;

  attendanceMarkData.absentStudents = [];
  attendanceMarkData.student = [];
  let studentOrder = { paper: 0 };
  for (let index = 0; index < attendanceData.length; index++) {
    // for markng absentStudents
    if (!attendanceData[index].isAttenadce) {
      attendanceMarkData.absentStudents.push(attendanceData[index].student);
      // push present Student
      if (studentOrder.starting) {
        attendanceMarkData.student.push(studentOrder);
        studentOrder = { paper: 0 };
      }
    } else {
      // for adding presentStudent
      if (!studentOrder.starting) {
        studentOrder.starting = attendanceData[index].student;
        studentOrder.paper = 1;
        studentOrder.ending = attendanceData[index].student;
        continue;
      }
      studentOrder.paper++;
      studentOrder.ending = attendanceData[index].student;
    }
  }
  // pushing unpushed students
  if (studentOrder.starting) {
    attendanceMarkData.student.push(studentOrder);
  }

  return attendanceMarkData;
};


exports.absentMarking = async (absent, date, present) => {

  const examDate = new Date(date);

  let aggreateData = [
    {
      $lookup: {
        from: "users",
        localField: "student",
        foreignField: "_id",
        as: "student",
      },
    },
    { $match: { student: { $exists: true, $not: { $size: 0 } } } },
    {
      $lookup: {
        from: "student",
        localField: "student.student",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $match: { date: examDate }
    }
  ];



  await Promise.all([absentMarking(absent, aggreateData),
  studnetAnsMarking(present, aggreateData)]);

  return "Marking is Done";


};


async function absentMarking(absent, aggreateData) {

  let studentData;
  for (let index = 0; index < absent.length; index++) {

    aggreateData.push({
      $match: { "student.rollno": absent[index] }
    });

    aggreateData.push({ $set: { isAttenadce: false } })
    
    studentData = await SeatArragement.aggregate(aggreateData);

  }
}

async function studnetAnsMarking(present, aggreateData) {

  for (let index = 0; index < present.length; index++) {

    aggreateData.push({
      $match: { "student.rollno": present[index].rollNo }
    });

    aggreateData.push({ $set: { ansSheet: present[index].paper } });

    await SeatArragement.aggregate(aggreateData);
  }

}