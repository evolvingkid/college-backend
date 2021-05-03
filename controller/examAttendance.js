const SeatArragement = require("../model/seatArragement");
const { createAttendanceDocument, absentMarking } = require("../services/attendanceServices");

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
  const courseData = req.course;
  const examHallData = req.examhall;

  const { date } = req.query;

  if (!date) {
    return res.json({ error: "Pls Provide Date" });
  }

  const attendanceMarkData = await createAttendanceDocument(
    date,
    courseData,
    examHallData
  );

  return res.json({ data: attendanceMarkData });
};
