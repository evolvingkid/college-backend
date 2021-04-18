const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { courseByID } = require('../controller/course');
const { createExam } = require('../controller/exam');
const { examCreationvalidation } = require('../validation/exam');

router.post('/:courseID', jwtAuthVerification, examCreationvalidation, createExam);

router.param('courseID', courseByID);

module.exports = router;