const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../controller/auth");
const {
  permissionOnDepartment,
  createDepartment,
  listDepartment,
  departmentByID,
  editDepartment,
  departmentDelete,
  getDepartmentData,
} = require("../controller/department");
const { departmentReq } = require("../validation/department");
const {
  departmentManagePermission,
  departmentReadPermission,
} = require("../auth/department");

router.post(
  "/",
  departmentReq,
  jwtAuthVerification,
  departmentManagePermission,
  createDepartment
);
router.get("/", jwtAuthVerification, listDepartment);
router.get("/:departmentByID", jwtAuthVerification, getDepartmentData);
router.patch(
  "/:departmentByID",
  jwtAuthVerification,
  departmentManagePermission,
  editDepartment
);
router.delete(
  "/:departmentByID",
  jwtAuthVerification,
  departmentManagePermission,
  departmentDelete
);

router.param("departmentByID", departmentByID);

module.exports = router;

