const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { createProgram , listProgram, programdelete, programByID,programPermission} = require('../controller/program');
const { programReq } = require('../validation/program');

router.post('/', jwtAuthVerification, programReq, programPermission, createProgram);
router.get('/', jwtAuthVerification, listProgram);
router.delete('/:programid', jwtAuthVerification, programPermission, programdelete);

router.param('programid', programByID);

module.exports = router;