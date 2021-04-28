const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../../controller/auth");
const { websitemanage } = require("../../auth/website");
const { fileUpload } = require("../../config/fileUpload");
const {
  bannerList,
  bannerCreation,
  bannerDelete,
  bannerByID,
} = require("../../controller/website/banner");

router.get("/", bannerList);

router.post(
  "/",
  jwtAuthVerification,
  fileUpload.fields([{ name: "img", maxCount: 1 }]),
  websitemanage,
  bannerCreation
);

router.delete("/:bannerID", jwtAuthVerification, websitemanage, bannerDelete);

router.param("bannerID", bannerByID);

module.exports = router;
