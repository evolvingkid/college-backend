const express = require('express');
const router = express.Router();


const { createExamHall, examHallList, examhallByID, examHallEdit, examHallDelete } = require('../controller/examhall');
const { jwtAuthVerification } = require('../controller/auth');
const { examhallReq } = require('../validation/examhall');

router.post('/', jwtAuthVerification, examhallReq, createExamHall);
router.get('/', jwtAuthVerification, examHallList);
router.patch('/:examhallID', jwtAuthVerification, examHallEdit);
router.delete('/:examhallID', jwtAuthVerification, examHallDelete);

router.param('examhallID', examhallByID);


module.exports = router;