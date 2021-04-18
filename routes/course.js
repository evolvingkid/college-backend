const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const {  createCourse, courseList, courseByID, courseDelete, courseEdit } = require('../controller/course');
const { courseReq } = require('../validation/course');
const { courseManagePermission, courseReadPermission } = require('../auth/course');

router.post('/', jwtAuthVerification, courseReq, courseManagePermission, createCourse);
router.get('/', jwtAuthVerification, courseReadPermission, courseList);
router.delete('/:courseByID', jwtAuthVerification, courseManagePermission, courseDelete);
router.patch('/:courseByID', jwtAuthVerification, courseManagePermission, courseEdit);


router.param('courseByID', courseByID);

module.exports = router;