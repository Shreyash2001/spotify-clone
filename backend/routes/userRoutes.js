const express = require("express");
const {
  login,
  signup,
  playlistController,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const routes = express.Router();
routes.route("/playlist/add").post(protect, playlistController);
routes.route("/signup").post(signup);
routes.route("/login").post(login);

module.exports = routes;
