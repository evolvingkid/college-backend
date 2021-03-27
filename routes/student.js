const express = require('express');
const router = express.Router();


const { jwtAuthVerification } = require('../controller/auth');
const { createStudent, studentPermission, listStudent, studentByID, editStudent, deleteStudent } = require('../controller/student');
const { studentReq } = require('../validation/student');

router.post('/', jwtAuthVerification, studentReq, studentPermission, createStudent);
router.get('/', jwtAuthVerification, listStudent);
router.patch('/:studentByID', jwtAuthVerification, editStudent);
router.delete('/:studentByID', jwtAuthVerification, studentPermission, deleteStudent);

router.param('studentByID', studentByID);

module.exports = router;