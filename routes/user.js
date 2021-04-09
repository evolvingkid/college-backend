const express = require('express');
const router = express.Router();

const { listUsers, userByID, deleteUser, userPasswordChange, listTeachers } = require('../controller/user');
const { jwtAuthVerification } = require('../controller/auth');
const { passwordvalidation } = require('../validation/auth');
const  { userManagePermission, userReadPermission} = require('../auth/user');

router.get('/', jwtAuthVerification, userReadPermission, listUsers);
router.get('/teacher', jwtAuthVerification, userReadPermission, listTeachers);
router.delete('/:userByID', jwtAuthVerification, userManagePermission, deleteUser);
router.patch('/passwordchange', jwtAuthVerification, passwordvalidation, userPasswordChange);

router.param("userByID", userByID);

module.exports = router;