const express = require('express');
const router = express.Router();

const { websiteCoreListDataCreate } = require('../../controller/website/websiteCoreListData');
const { jwtAuthVerification } = require('../../controller/auth');
const { websitemanage } = require('../../auth/website');

router.post('/', jwtAuthVerification, websitemanage, websiteCoreListDataCreate);

module.exports = router;
