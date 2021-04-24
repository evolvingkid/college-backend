const express = require('express');
const router = express.Router();

const { websiteHome } = require('../../controller/website/websiteHome');

router.get('/',websiteHome);

router.post('/navbar');

module.exports = router;