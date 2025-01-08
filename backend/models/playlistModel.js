const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    songs: [ 
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);
const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
