const express = require('express');
const router = express.Router();

const { seatArragemnet, seatArragemnetList } = require('../controller/seatArragement');
const { jwtAuthVerification } = require('../controller/auth');
const { seatArragemnetValidation } = require('../validation/seatArragement');

router.post('/', jwtAuthVerification, seatArragemnetValidation, seatArragemnet);
router.get('/', jwtAuthVerification, seatArragemnetList)


module.exports = router;