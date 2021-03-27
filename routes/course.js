const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { coursePermmison, createCourse, courseList, courseByID, courseDelete, courseEdit, AddExamDate } = require('../controller/course');
const { courseReq } = require('../validation/course');

router.post('/', jwtAuthVerification, courseReq, coursePermmison, createCourse);
router.get('/', jwtAuthVerification, courseList);
router.delete('/:courseByID', jwtAuthVerification, coursePermmison, courseDelete);
router.patch('/:courseByID', jwtAuthVerification, coursePermmison, courseEdit);
router.patch('/examdate/:courseByID', jwtAuthVerification, coursePermmison, AddExamDate);

router.param('courseByID', courseByID);

module.exports = router;