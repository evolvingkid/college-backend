const express = require('express');
const router = express.Router();

const { listUsers, userByID, deleteUser, userPermission } = require('../controller/user');
const { jwtAuthVerification } = require('../controller/auth')

router.get('/', jwtAuthVerification, listUsers);
router.delete('/:userByID', jwtAuthVerification, userPermission, deleteUser);

router.param("userByID", userByID);

module.exports = router;