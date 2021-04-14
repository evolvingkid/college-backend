const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const { listUsers, userByID, deleteUser, userPasswordChange, listTeachers, studentList, userEdit } = require('../controller/user');
const { jwtAuthVerification } = require('../controller/auth');
const { passwordvalidation } = require('../validation/auth');
const { userManagePermission, userReadPermission } = require('../auth/user');
const multer = require('multer');
const { fileUpload } = require('../config/fileUpload')

router.get('/', jwtAuthVerification, userReadPermission, listUsers);
router.get('/teacher', jwtAuthVerification, userReadPermission, listTeachers);
router.get('/student', jwtAuthVerification, userReadPermission, studentList);
router.delete('/:userByID', jwtAuthVerification, userManagePermission, deleteUser);
router.patch('/passwordchange', jwtAuthVerification, passwordvalidation, userPasswordChange);
router.patch('/:userByID', jwtAuthVerification, userManagePermission, fileUpload.single('profilePic'), userEdit);

router.param("userByID", userByID);

module.exports = router;