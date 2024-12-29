const express = require("express");
const { adminProtect, checkPermission } = require("../middleware/auth");
const router = express.Router();

router.post("/add-artist", adminProtect, checkPermission("addArtist"));

module.exports = router;
