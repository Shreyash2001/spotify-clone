const Playlist = require("../models/playlistModel");
const Song = require("../models/songModel");
const User = require("../models/userModel");
const { retry } = require("../utilities/retry");
const mongoose = require("mongoose");

const playlistController = async (req, res) => {
  try {
    const { title, description, songs, imageUrl, isPublic } = req.body;
    let finalImageUrl = imageUrl;
    if (!finalImageUrl) {
      const firstSongDetails = await Song.findById(songs[0]);
      finalImageUrl = firstSongDetails.imageUrl;
    }
    const playlist = await Playlist.create({
      user: req.user.id,
      title,
      description,
      songs: songs,
      imageUrl: finalImageUrl,
      isPublic,
    });
    if (!playlist) {
      return res.status(400).json({ message: "Failed to create playlist." });
    }

    res.status(201).json({ playlist });

    const updateUserPlaylists = async () => {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $push: { playlists: playlist._id },
      });

      return user;
    };
    try {
      await updateUserPlaylists();
      return;
    } catch (updateError) {
      console.log(updateError);
      try {
        await retry(updateUserPlaylists, 3, 2000);
      } catch (retryError) {
        console.error(
          "Failed to update user playlists after retries:",
          retryError
        );
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(playlistId) ||
      !mongoose.Types.ObjectId.isValid(songId)
    ) {
      return res.status(400).json({ message: "Invalid playlist or song ID." });
    }

    // Use atomic operation to remove the song
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { songs: songId } },
      { new: true } // Return the updated playlist
    );

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found." });
    }

    return res.status(200).json({
      message: "Song removed from playlist.",
      playlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = { playlistController, removeSongFromPlaylist };
