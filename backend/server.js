const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authenticationRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();
connectDB();

app.use("/api/auth", authenticationRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("listening on port " + PORT));
