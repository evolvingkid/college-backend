const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../../controller/auth");
const { websitemanage } = require("../../auth/website");

router.post("/", jwtAuthVerification, websitemanage);

module.exports = router;
