const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../controller/auth");
const { examManagePermission } = require("../auth/exam");
const { examhallByID } = require("../controller/examhall");
const { markExamAtteance } = require("../controller/examAttendance");
const { attendanceExamValidation } = require("../validation/seatArragement");

router.post(
  "/:examHallID",
  jwtAuthVerification,
  examManagePermission,
  attendanceExamValidation,
  markExamAtteance
);

router.param("examHallID", examhallByID);

module.exports = router;
