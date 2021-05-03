
const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../../controller/auth');
const { eventManagePermission } = require('../../auth/event');
const { createEvent, listEvents, editEvent, eventDelete, eventByID, publicEventView } = require('../../controller/website/event');
const { departmentByID } = require("../../controller/department");
const { fileUpload } = require("../../config/fileUpload")

router.post('/:departmentID',  jwtAuthVerification, eventManagePermission, fileUpload.single("image"), createEvent);
router.get('/', jwtAuthVerification, listEvents);
router.get('/public', publicEventView);
router.patch('/:eventByID', jwtAuthVerification, eventManagePermission, editEvent);
router.delete('/:eventByID', jwtAuthVerification, eventManagePermission, eventDelete);

router.param('eventByID', eventByID);
router.param('departmentID', departmentByID);


module.exports = router;