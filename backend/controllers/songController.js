const Song = require("../models/songModel");
const addSongController = async (req, res) => {
  try {
    const {
      user,
      title,
      artist,
      genre,
      imageUrl,
      audioUrl,
      releaseDate,
      videoUrl,
      duration,
    } = req.body;
    const songExists = await Song.findOne({ title: title });
    if (songExists) {
      return res
        .status(400)
        .json({ message: "Song already exists", status: "error" });
    }
    const song = new Song({
      user,
      title,
      artist,
      genre,
      imageUrl,
      audioUrl,
      videoUrl,
      releaseDate,
      duration,
    });
    await song.save();
    return res
      .status(201)
      .json({ message: "Song added successfully", status: "success", song });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
};

module.exports = { addSongController };
