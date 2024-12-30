const Song = require("../models/songModel");
const addSongController = async (req, res) => {
  try {
    const { title, artist, genre, imageUrl, audioUrl, releaseDate } = req.body;
    const song = new Song({
      title,
      artist,
      genre,
      imageUrl,
      audioUrl,
      releaseDate,
    });
    await song.save();
    return res
      .status(201)
      .json({ message: "Song added successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
};

module.exports = { addSongController };
