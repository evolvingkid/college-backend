const express = require("express");
const router = express.Router();

const { jwtAuthVerification } = require("../controller/auth");
const {
  batchByID,
  addSem,
  listbatch,
  getBatchData,
} = require("../controller/batch");

router.patch("/:batchID", jwtAuthVerification, addSem);
router.get("/", jwtAuthVerification, listbatch);
router.get("/:batchID", jwtAuthVerification, getBatchData);
router.param("batchID", batchByID);

module.exports = router;
