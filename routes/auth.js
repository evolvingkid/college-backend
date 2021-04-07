const express = require('express');
const router = express.Router();
const { signup, signin, jwtAuthVerification } = require('../controller/auth');
const { signinValidation, signupvalidation } = require('../validation/auth');
const {userPermission} = require('../controller/user');

router.post('/signup',signupvalidation,signup);
router.post('/signin',signinValidation, signin);

module.exports = router;