const express = require('express');
const router = express.Router();
const { signup, signin, jwtAuthVerification } = require('../controller/auth');
const { signinValidation, signupvalidation } = require('../validation/auth');
const { userManagePermission} = require('../auth/user');

router.post('/signup', jwtAuthVerification, userManagePermission, signupvalidation, signup);
router.post('/signin', signinValidation, signin);

module.exports = router;