const express = require("express");
const { adminProtect, checkPermission } = require("../middleware/auth");
const { addSongController } = require("../controllers/songController");
const router = express.Router();

router
  .route("/add-song")
  .post(adminProtect, checkPermission("addSongs"), addSongController);

module.exports = router;
