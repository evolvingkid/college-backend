const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../controller/auth");
const {
  createProgram,
  listProgram,
  programdelete,
  programByID,
  getProgramData,
} = require("../controller/program");
const { programReq } = require("../validation/program");
const {
  programManagePermission,
  programReadPermission,
} = require("../auth/program");

router.post(
  "/",
  jwtAuthVerification,
  programReq,
  programManagePermission,
  createProgram
);
router.get("/", jwtAuthVerification, programReadPermission, listProgram);
router.get(
  "/:programid",
  jwtAuthVerification,
  programReadPermission,
  getProgramData
);
router.delete(
  "/:programid",
  jwtAuthVerification,
  programManagePermission,
  programdelete
);

router.param("programid", programByID);

module.exports = router;

