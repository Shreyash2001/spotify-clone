import React from "react";
import "./MyCard.css";
import { motion } from "framer-motion";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

function MyCard() {
  return (
    <div className="card">
      <div className="hovered-background-card" />
      <img
        src="https://images.unsplash.com/photo-1647647699992-4f7489c236ca?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        <PlayCircleIcon style={{ color: "#1db954", fontSize: "60px" }} />
      </div>
      <h4 className="card-title">Diljeet Top Mix</h4>
      <p style={{ color: "#888", margin: "2px 0px" }} className="card-title">
        asdhcas sdsd sdfjsdjk sdfhsdfh sdjfhsd sefksj
      </p>
    </div>
  );
}

export default MyCard;
