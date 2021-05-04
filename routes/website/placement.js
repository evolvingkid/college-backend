const express = require("express");
const router = express.Router();
const { jwtAuthVerification } = require("../../controller/auth");
const { placementManagePermission } = require("../../auth/placement");
const { createPlacement, listPlacement, editPlacement, placementByID , deleteplacement} = require("../../controller/website/placement")

router.post('/', jwtAuthVerification, placementManagePermission, createPlacement);
router.get('/', listPlacement);
router.patch('/:placementID', jwtAuthVerification, placementManagePermission, editPlacement);
router.delete('/:placementID', jwtAuthVerification, placementManagePermission,deleteplacement);

router.param('placementID', placementByID);

module.exports = router;