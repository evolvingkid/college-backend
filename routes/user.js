const express = require('express');
const router = express.Router();

const { listUsers, userByID, deleteUser, userPermission, userPasswordChange } = require('../controller/user');
const { jwtAuthVerification } = require('../controller/auth');
const { passwordvalidation } = require('../validation/auth');

router.get('/', jwtAuthVerification, listUsers);
router.delete('/:userByID', jwtAuthVerification, userPermission, deleteUser);
router.patch('/passwordchange', jwtAuthVerification, passwordvalidation, userPasswordChange);

router.param("userByID", userByID);

module.exports = router;