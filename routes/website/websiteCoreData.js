const express = require("express");
const router = express.Router();

const {
  addCoreData,
  listCoreData,
  coreDataByID,
  updateCoreData,
  deleteCoreData,
} = require("../../controller/website/websiteCoreData");

const { jwtAuthVerification } = require("../../controller/auth");
const { websitemanage } = require("../../auth/website");
const {
  websiteCoreDataCreationValidation,
} = require("../../validation/websteCoreData");
const { fileUpload } = require("../../config/fileUpload");

router.post(
  "/",
  fileUpload.fields([{ name: "data[img]", maxCount: 1 }]),
  jwtAuthVerification,
  websitemanage,
  websiteCoreDataCreationValidation,
  addCoreData
);

router.get("/", listCoreData);

router.patch(
  "/:coredata",
  fileUpload.fields([{ name: "data[img]", maxCount: 1 }]),
  jwtAuthVerification,
  websitemanage,
  updateCoreData
);

router.delete("/:coredata", jwtAuthVerification, websitemanage, deleteCoreData);

router.param("coredata", coreDataByID);

module.exports = router;
