const express = require("express");
const router = express.Router();

const { examhallByID } = require("../controller/examhall");
const { jwtAuthVerification } = require("../controller/auth");
const { examManagePermission } = require("../auth/exam");
const {  addAnsSheet } = require("../controller/examAnsSheet");
const { userByID } = require("../controller/user/users")

router.post('/:userID', jwtAuthVerification, examManagePermission, addAnsSheet);

router.param('userID', userByID)
router.param("examHallID", examhallByID);

module.exports = router;
