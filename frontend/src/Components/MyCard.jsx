import React from "react";
import "./MyCard.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

function MyCard({ title, description, image }) {
  return (
    <div className="card">
      <div className="hovered-background-card" />
      <img
        src={image}
        alt="mix"
        className="card-image"
        style={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <div className="mycard-play-icon">
        <PlayCircleIcon style={{ fontSize: "60px" }} />
      </div>
      <h4 className="card-title">{title}</h4>
      <p style={{ color: "#888", margin: "2px 0px" }} className="card-title">
        {description}
      </p>
    </div>
  );
}

export default MyCard;
