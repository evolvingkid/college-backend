const express = require('express');
const router = express.Router();

const { addCoreData } = require('../../controller/website/websiteCoreData');
const { jwtAuthVerification } = require('../../controller/auth');
const { websitemanage } = require('../../auth/website');
const { websiteCoreDataCreationValidation } = require('../../validation/websteCoreData')

router.post('/', jwtAuthVerification, websitemanage, websiteCoreDataCreationValidation, addCoreData);

module.exports = router;