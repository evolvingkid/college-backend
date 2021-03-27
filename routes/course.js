const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { coursePermmison, createCourse, courseList } = require('../controller/course');
const { courseReq } = require('../validation/course');

router.post('/', jwtAuthVerification, courseReq, coursePermmison, createCourse);
router.get('/', jwtAuthVerification, courseList);


module.exports = router;