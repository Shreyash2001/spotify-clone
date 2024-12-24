import React from "react";
import "./HomeScreen.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SubTopBar from "../Components/SubTopBar";

function HomeScreen() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="homeScreen-content">
          <SubTopBar />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
