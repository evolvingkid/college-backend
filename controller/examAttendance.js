const SeatArragement = require("../model/seatArragement");
const { createAttendanceDocument } = require("../services/attendanceServices");

exports.markExamAtteance = async (req, res) => {
  try {
    const examhallData = req.examhall;
    const { date, absent } = req.body;

    await SeatArragement.updateMany(
      { examhall: examhallData._id, date: date },
      { isAttenadce: true }
    );
    if (absent) {
      for (let i = 0; i < absent.length; i++) {
        await SeatArragement.updateOne(
          { student: absent[i], date: date },
          { isAttenadce: false }
        );
      }
    }

    return res.json({ msg: "Exam Update" });
  } catch (error) {
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
