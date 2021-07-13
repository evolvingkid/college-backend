const SeatArragement = require("../model/seatArragement");
const { createAttendanceDocument, absentMarking } = require("../services/attendanceServices");
const ExamHall = require("../model/examhall");

exports.markExamAtteance = async (req, res) => {
  try {

    const { date, absent, present } = req.body;

    const examAttandance = await absentMarking(absent, date, present);

    return res.json({ msg: examAttandance });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error occured",
    });
  }
};

exports.attendanceMark = async (req, res) => {
  // const courseData = req.course;
  // const examHallData = req.examhall;
  const { date } = req.query;

  if (!date) {
    return res.json({ error: "Pls Provide Date" });
  }

  const examHallData = await ExamHall.find();
  let attendanceMarkData = [];

  // ? to acess eevery data from that date
  for (let index = 0; index < examHallData.length; index++) {

    let seatArragmentData = await SeatArragement.
      find({ date: date, examhall: examHallData[index] })
      .populate("course");

      console.log(seatArragmentData);

    let courseID = [];

    for (let j = 0; j < seatArragmentData.length; j++) {

      if (!courseID.includes(seatArragmentData[j].course._id)) {
        courseID.push(seatArragmentData[j].course._id);

        // ? to acess single Data
        let attendanceMarkDataTemp = await createAttendanceDocument(
          date,
          seatArragmentData[j].course,
          examHallData[index]
        );

        attendanceMarkData.push(attendanceMarkDataTemp);

      }

    }

  }

  return res.json({ data: attendanceMarkData });
};
