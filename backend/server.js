const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authenticationRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");
const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.use("/api/auth", authenticationRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/song", songRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("listening on port " + PORT));
