const express = require("express");
const { playlistController } = require("../controllers/playlistController");
const { protect } = require("../middleware/auth");
const routes = express.Router();
routes.route("/create").post(protect, playlistController);

module.exports = routes;
