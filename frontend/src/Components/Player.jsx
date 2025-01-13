import React, { useEffect, useRef, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

function Player({ volume }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (event) => {
    const container = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const clickX = event.clientX - containerRect.left;
    const newTime = (clickX / containerRect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Check if the left or right arrow key is pressed
      if (event.key === "ArrowLeft") {
        audio.currentTime = Math.max(audio.currentTime - 5, 0); // Seek backward by 5 seconds
      } else if (event.key === "ArrowRight") {
        audio.currentTime = Math.min(audio.currentTime + 5, audio.duration); // Seek forward by 5 seconds
      }
      if (event.key === " ") {
        if (audio.paused) {
          audio.play();
          setIsPlaying(true);
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      }
    };

    // Add keydown listener
    window.addEventListener("keydown", handleKeydown);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="musicplayer" style={styles.musicPlayer}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        src="https://res.cloudinary.com/cqn/video/upload/v1736798827/vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290_mzg49g.mp3"
      ></audio>
      <div style={styles.controls}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <ShuffleIcon />
          </div>
          <div style={{ margin: "0px 20px" }}>
            <SkipPreviousIcon />
          </div>
          <div style={{ margin: "0px 10px" }} onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseCircleIcon
                style={{ fontSize: "35px", cursor: "pointer" }}
              />
            ) : (
              <PlayCircleIcon style={{ fontSize: "35px", cursor: "pointer" }} />
            )}
          </div>
          <div style={{ margin: "0px 20px" }}>
            <SkipNextIcon />
          </div>
          <div>
            <RepeatIcon />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={styles.currentTime}>
            {formatTime(audioRef.current?.currentTime || 0)}
          </span>
          <div style={styles.progressBarContainer} onClick={handleSeek}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            ></div>
          </div>
          <span style={styles.totalTime}>
            {formatTime(
              audioRef.current?.duration -
                (audioRef.current?.currentTime || 0) || 0
            )}
          </span>
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
    left: "25%",
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
    backgroundColor: "#1db954",
    borderRadius: "5px",
  },
  currentTime: {
    color: "grey",
    margin: "0px 10px",
  },
  totalTime: {
    color: "grey",
    margin: "0px 10px",
  },
};

export default Player;
