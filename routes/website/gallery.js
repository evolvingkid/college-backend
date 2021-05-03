const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../../controller/auth");
const { websitemanage } = require("../../auth/website");
const { fileUpload } = require("../../config/fileUpload");
const { addGallery, listGallery, deleteGallery, galleryByID } = require("../../controller/website/gallery");

router.get("/", listGallery);
router.post("/", jwtAuthVerification, fileUpload.single("file"), websitemanage, addGallery);
router.delete("/:galleryID", jwtAuthVerification, websitemanage, deleteGallery);

router.param("galleryID", galleryByID);

module.exports = router;