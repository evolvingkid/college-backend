
const express = require('express');
const router = express.Router();

const { jwtAuthVerification } = require('../controller/auth');
const { permissionOnDepartment, createDepartment,
    listDepartment, departmentByID,
    editDepartment, departmentDelete } = require('../controller/department')
const { departmentReq } = require('../validation/department');


router.post('/', departmentReq, jwtAuthVerification, permissionOnDepartment, createDepartment);
router.get('/', jwtAuthVerification, listDepartment);
router.patch('/:departmentByID', jwtAuthVerification, editDepartment);
router.delete('/:departmentByID', jwtAuthVerification, departmentDelete);

router.param('departmentByID', departmentByID)


module.exports = router;