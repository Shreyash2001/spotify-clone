const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signup = async (req, res) => {
  try {
    const { name, email, password, dob, gender, favourites } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
      favourites,
      refreshToken,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Login successful!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

const playlistController = async (req, res) => {
  try {
    const { title, description, songId, imageUrl, isPublic } = req.body;
    const playlist = await Playlist.create({
      user: req.user.id,
      title,
      description,
      songs: [songId],
      imageUrl,
      isPublic,
    });
    if (!playlist) {
      return res.status(400).json({ message: "Failed to create playlist." });
    }
    return res.status(201).json({ playlist });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = { signup, login, playlistController };
