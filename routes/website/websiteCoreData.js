const express = require('express');
const router = express.Router();

const { addCoreData } = require('../../controller/website/websiteCoreData');
const { jwtAuthVerification } = require('../../controller/auth');
const { websitemanage } = require('../../auth/website');
const { websiteCoreDataCreationValidation } = require('../../validation/websteCoreData');
const { fileUpload } = require('../../config/fileUpload');

router.post('/', jwtAuthVerification, websitemanage, websiteCoreDataCreationValidation, fileUpload.fields([{ name: 'data.img', maxCount: 1 }]), addCoreData);

module.exports = router;