const express = require('express');
const { jwtAuthVerification } = require('../controller/auth');
const router = express.Router();
const { userManagePermission } = require('../auth/user');
const { viewPermission } = require('../controller/permission');

router.get('/', jwtAuthVerification, userManagePermission, viewPermission);


module.exports = router;