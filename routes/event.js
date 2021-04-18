
const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { eventManagePermission } = require('../auth/event');
const { createEvent, listEvents, editEvent, eventDelete, eventByID } = require('../controller/event');


router.post('/',  jwtAuthVerification, eventManagePermission, createEvent);
router.get('/', jwtAuthVerification, listEvents);
router.patch('/:eventByID', jwtAuthVerification, eventManagePermission, editEvent);
router.delete('/:eventByID', jwtAuthVerification, eventManagePermission, eventDelete);

router.param('eventByID', eventByID)


module.exports = router;