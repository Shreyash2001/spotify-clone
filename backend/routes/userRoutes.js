const express = require("express");
const {
  login,
  signup,
  playlistController,
} = require("../controllers/userController");
const routes = express.Router();
routes.route("/signup").post(signup);
routes.route("/login").post(login);

module.exports = routes;
