import React from "react";
import "./HomeScreen.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SubTopBar from "../Components/SubTopBar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { motion } from "framer-motion";
import MyCard from "../Components/MyCard";

function HomeScreen() {
  const TopMixes = () => {
    return (
      <div className="homeScreen-topMixes">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((mix) => {
          return (
            <div className="homeScreen-topMix-container">
              <div className="homeScreen-topMix">
                <img
                  src="https://images.unsplash.com/photo-1647647699992-4f7489c236ca?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="mix"
                  className="homeScreen-topMix-image"
                />
                <h4 className="homeScreen-topMix-title">Diljeet Top Mix</h4>
              </div>
              <motion.div whileHover={{ scale: 1.04 }}>
                <PlayCircleIcon
                  className="homeScreen-play-button"
                  sx={{ color: "#1db954", margin: "0px 2px", fontSize: "30px" }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="homeScreen-content">
          <SubTopBar />
          <TopMixes />
          <MyCard />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
