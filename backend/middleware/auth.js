const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const permissions = {
  admin: ["addArtist", "editArtist", "deleteArtist"],
  moderator: ["addArtist", "editArtist"],
};

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

const adminProtect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

const checkPermission = (action) => {
  return (req, res, next) => {
    const userPermissions = permissions[req.user.role] || [];
    if (!userPermissions.includes(action)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};

module.exports = { protect, adminProtect, checkPermission };
