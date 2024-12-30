const Artist = require("../models/artistModel");

const addArtistController = async (req, res) => {
  try {
    const { name, imageUrl, dob } = req.body;

    const artist = await Artist.create({
      name,
      imageUrl,
      dob,
    });
    if (artist) {
      return res
        .status(201)
        .json({ message: "Artist added successfully", status: "success" });
    } else {
      return res.status(400).json({
        message: "Failed to add artist. Please try again.",
        status: "error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: "error" });
  }
};

module.exports = { addArtistController };
