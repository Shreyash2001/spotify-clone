import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Player from "./Player";
import VolumeDown from "@mui/icons-material/VolumeDown";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/material";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function MusicPlayer() {
  const [volume, setVolume] = useState(30);
  const [volumeIcon, setVolumeIcon] = useState(<VolumeDown />);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleChangeVolume = (event, newValue) => {
    volumeIconSetter(newValue);
    setVolume(newValue);
  };
  const volumeIconSetter = (val) => {
    if (val > 0 && val <= 50) {
      setVolumeIcon(<VolumeDown />);
    } else if (val > 50) {
      setVolumeIcon(<VolumeUpIcon />);
    } else {
      setVolumeIcon(<VolumeOffIcon />);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement; // Fullscreen the document
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    // Add fullscreen change event listeners
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);
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
            {volumeIcon}
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
        <div
          onClick={toggleFullscreen}
          style={{ margin: "0px 10px", cursor: "pointer" }}
        >
          {!isFullscreen ? <FullscreenIcon /> : <FullscreenExitIcon />}
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
