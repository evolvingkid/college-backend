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
