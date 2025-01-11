const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
}, {
  timestamps: true,
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
