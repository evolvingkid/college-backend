const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../controller/auth");
const { examManagePermission } = require("../auth/exam");
const { examhallByID } = require("../controller/examhall");
const {
  markExamAtteance,
  attendanceMark,
} = require("../controller/examAttendance");
const { attendanceExamValidation } = require("../validation/seatArragement");
const { courseByID } = require("../controller/course");

router.post(
  "/",
  jwtAuthVerification,
  examManagePermission,
  attendanceExamValidation,
  markExamAtteance
);

router.get(
  "/",
  jwtAuthVerification,
  examManagePermission,
  attendanceMark
);

router.param("examHallID", examhallByID);
router.param("courseID", courseByID);

module.exports = router;
