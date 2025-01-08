const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator", "super-admin"],
    default: "user",
  },
  admin: {
    type: String,
    default: "user",
  },
  permissions: [
    {
      type: String,
    },
  ],
  playlists: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  dob: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  refreshTokenExpiry: {
    type: Date,
  },
  favourites: [
    {
      type: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
