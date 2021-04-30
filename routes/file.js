const express = require("express");
const router = express.Router();

const {
  changeVisibiltyOfFile,
  fileByID,
  fileList,
  fileDelete,
  sendFile,
} = require("../controller/file");
const { jwtAuthVerification } = require("../controller/auth");
const { websitemanage } = require("../auth/website");

router.patch(
  "/visibility/:fileID",
  jwtAuthVerification,
  websitemanage,
  changeVisibiltyOfFile
);
router.get("/", jwtAuthVerification, fileList);
router.get("/:fileID", sendFile);
router.delete("/:fileID", jwtAuthVerification, websitemanage, fileDelete);

router.param("fileID", fileByID);

module.exports = router;
