const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    artist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Artist",
      },
    ],
    duration: {
      type: Number,
      required: true,
    },
    album: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    popularity: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: true,
      },
    ],
    releaseDate: {
      type: String,
      required: true,
    },
    listens: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    playlists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
