const express = require('express');
const router = express.Router();


const { createExamHall } = require('../controller/examhall');
const { jwtAuthVerification } = require('../controller/auth');
const { examhallReq} = require('../validation/examhall');

router.post('/', jwtAuthVerification,  examhallReq, createExamHall);

module.exports = router;