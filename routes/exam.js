const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { courseByID } = require('../controller/course');
const { createExam, examList, examByID, examEdit } = require('../controller/exam');
const { examCreationvalidation } = require('../validation/exam');

router.post('/:courseID', jwtAuthVerification, examCreationvalidation, createExam);
router.get('/', jwtAuthVerification, examList);
router.patch('/:examID', jwtAuthVerification, examEdit);

router.param('courseID', courseByID);
router.param('examID', examByID);


module.exports = router;