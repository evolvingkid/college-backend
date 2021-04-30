const express = require("express");
const router = express.Router();

// get users data
const {
  getUserData,
  listUsers,
  userEdit,
  deleteUser,
  userPasswordChange,
  userByID,
} = require("../controller/user/users");
const { studentList } = require("../controller/user/student");
const { listTeachers } = require("../controller/user/teachers");
// authirisation Data
const { jwtAuthVerification } = require("../controller/auth");
const { passwordvalidation } = require("../validation/auth");
// permissions
const { userManagePermission, userReadPermission } = require("../auth/user");
// externals
const { fileUpload } = require("../config/fileUpload");

// get methods
router.get("/", jwtAuthVerification, userReadPermission, listUsers);
router.get("/teacher", jwtAuthVerification, userReadPermission, listTeachers);
router.get("/student", jwtAuthVerification, userReadPermission, studentList);
router.get("/:userByID", jwtAuthVerification, userReadPermission, getUserData);
// DELETE Methods
router.delete(
  "/:userByID",
  jwtAuthVerification,
  userManagePermission,
  deleteUser
);
// PATCH methods
router.patch(
  "/passwordchange",
  jwtAuthVerification,
  passwordvalidation,
  userPasswordChange
);
// user file uploads
const userFileUploads = [
  { name: "profilePic", maxCount: 1 },
  { name: "adharFile", maxCount: 1 },
  { name: "certificate", maxCount: 5 },
];
router.patch(
  "/:userByID",
  jwtAuthVerification,
  userManagePermission,
  fileUpload.fields(userFileUploads),
  userEdit
);

router.param("userByID", userByID);

module.exports = router;
