const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { batchByID, addSem } = require('../controller/batch');

router.patch('/:batchID', jwtAuthVerification, addSem);

router.param('batchID', batchByID);

module.exports = router;



