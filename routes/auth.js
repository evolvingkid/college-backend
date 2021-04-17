const express = require('express');
const router = express.Router();
const { signup, signin, jwtAuthVerification } = require('../controller/auth');
const { signinValidation, signupvalidation, bulkuserCreation } = require('../validation/auth');
const { userManagePermission } = require('../auth/user');
const { bulkStudentCreation } = require('../controller/student');

router.post('/signup', jwtAuthVerification, userManagePermission, signupvalidation, signup);
router.post('/signin', signinValidation, signin);
router.post('/bulkstudentcreation', jwtAuthVerification, userManagePermission, bulkuserCreation, bulkStudentCreation);

module.exports = router;