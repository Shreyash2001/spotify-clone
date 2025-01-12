import React, { useRef, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeDown from "@mui/icons-material/VolumeDown";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/material";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

function Player() {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(30);

  const handleChangeVolume = (event, newValue) => {
    setVolume(newValue);
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (event) => {
    const newTime =
      (event.nativeEvent.offsetX / event.target.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="musicplayer" style={styles.musicPlayer}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        src="your-music-file.mp3"
      ></audio>
      <div style={styles.controls}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <ShuffleIcon />
          </div>
          <div style={{ margin: "0px 20px" }}>
            <SkipPreviousIcon />
          </div>
          <div style={{ margin: "0px 20px" }} onClick={handlePlayPause}>
            <PlayCircleIcon style={{ fontSize: "35px", cursor: "pointer" }} />
          </div>
          <div style={{ margin: "0px 20px" }}>
            <SkipNextIcon />
          </div>
          <div>
            <RepeatIcon />
          </div>
        </div>

        <div style={styles.progressBarContainer} onClick={handleSeek}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "0px 50px",
        }}
      >
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
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

const styles = {
  musicPlayer: {
    width: "300px",
    borderRadius: "10px",
    position: "absolute",
    left: "30%",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  progressBarContainer: {
    width: "40vw",
    height: "4px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: "5px",
  },
};

export default Player;
