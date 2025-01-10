const express = require("express");
const {
  playlistController,
  removeSongFromPlaylist,
} = require("../controllers/playlistController");
const { protect } = require("../middleware/auth");
const routes = express.Router();
routes.route("/remove").delete(protect, removeSongFromPlaylist);
routes.route("/create").post(protect, playlistController);

module.exports = routes;
