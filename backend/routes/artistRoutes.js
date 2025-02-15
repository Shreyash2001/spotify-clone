const express = require("express");
const { adminProtect, checkPermission } = require("../middleware/auth");
const { addArtistController } = require("../controllers/artistController");
const router = express.Router();

router
  .route("/add-artist")
  .post(adminProtect, checkPermission("addArtist"), addArtistController);

module.exports = router;
