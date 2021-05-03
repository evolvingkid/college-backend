const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../../controller/auth");
const {  websitemanage } = require("../../auth/website");
const { createNewsLetters , listNewLetter, publicListnewsLetter} = require("../../controller/website/newsLetter");
const { fileUpload } =require("../../config/fileUpload");

router.post("/", jwtAuthVerification, websitemanage,
 fileUpload.single("image"), createNewsLetters);

 router.get('/', jwtAuthVerification, websitemanage, listNewLetter);
 router.get('/public', publicListnewsLetter);

module.exports = router;