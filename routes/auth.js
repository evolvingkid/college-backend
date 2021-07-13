const express = require("express");
const router = express.Router();
const { signup, signin, jwtAuthVerification } = require("../controller/auth");
const {
  signinValidation,
  signupvalidation,
  bulkuserCreation,
} = require("../validation/auth");
const { userManagePermission } = require("../auth/user");
const { bulkStudentCreation } = require("../controller/user/student");
const { fileUpload } = require("../config/fileUpload");

router.post(
  "/signup",
  signupvalidation,
  signup
);
router.post("/signin", signinValidation, signin);
router.post(
  "/bulkstudentcreation",
  jwtAuthVerification,
  bulkuserCreation,
  bulkStudentCreation
);

module.exports = router;

