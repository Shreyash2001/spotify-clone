import React, { useRef, useState } from "react";
import "./MusicPlayer.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Player from "./Player";
import VolumeDown from "@mui/icons-material/VolumeDown";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/material";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

function MusicPlayer() {
  const [volume, setVolume] = useState(30);

  const handleChangeVolume = (event, newValue) => {
    setVolume(newValue);
  };
  const getMusicDetails = () => {
    return (
      <div className="music_player_details">
        <div className="music_player_image_container">
          <img
            src="https://images.unsplash.com/photo-1647647699992-4f7489c236ca?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <h4 style={{ margin: "0px" }}>Born to Shine</h4>
          <span style={{ fontSize: "12px", color: "#ada9a9" }}>
            Diljit Dosanjh
          </span>
        </div>
        <div style={{ margin: "0px 15px" }}>
          <ControlPointIcon
            style={{ fontSize: "20px", color: "#ada9a9", cursor: "pointer" }}
          />
        </div>
      </div>
    );
  };
  const getRightControlDetails = () => {
    return (
      <div className="rightControls_container">
        <div style={{ margin: "0px 30px" }}>
          <SmartDisplayIcon />
        </div>
        <div style={{ width: "250px" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: "center", mb: 1 }}
          >
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleChangeVolume}
              sx={{
                "& .MuiSlider-thumb": {
                  color: "#fff",
                  width: "15px",
                  height: "15px",
                },
                "& .MuiSlider-track": {
                  color: "#1db954",
                },
                "& .MuiSlider-rail": {
                  color: "grey",
                },
              }}
            />
          </Stack>
        </div>
        <div style={{ margin: "0px 10px" }}>
          <FullscreenIcon />
        </div>
      </div>
    );
  };
  return (
    <div className="musicplayer">
      {getMusicDetails()}
      <Player volume={volume} />
      {getRightControlDetails()}
    </div>
  );
}

export default MusicPlayer;
