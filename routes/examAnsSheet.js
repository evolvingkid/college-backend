const express = require("express");
const router = express.Router();

const { examhallByID } = require("../controller/examhall");
const { jwtAuthVerification } = require("../controller/auth");
const { examManagePermission } = require("../auth/exam");
const { CreateExamAnsSheet } = require("../controller/examAnsSheet");

router.post(
  "/:examHallID",
  jwtAuthVerification,
  examManagePermission,
  CreateExamAnsSheet
);

router.param("examHallID", examhallByID);

module.exports = router;
