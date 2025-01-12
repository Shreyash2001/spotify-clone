import React, { useRef, useState } from "react";
import "./MusicPlayer.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Player from "./Player";

function MusicPlayer() {
  const audioRef = useRef(null); // Reference to the audio element
  const [progress, setProgress] = useState(0); // Progress bar value (0 to 100)

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
  const getRightControlDetails = () => {};
  return (
    <div className="musicplayer">
      {getMusicDetails()}
      <Player />
      {getRightControlDetails()}
    </div>
  );
}

export default MusicPlayer;
