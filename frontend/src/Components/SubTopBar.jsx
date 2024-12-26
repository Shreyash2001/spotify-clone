import React from "react";
import "./SubTopBar.css";
import MyChipComponent from "./MyChipComponent";

function SubTopBar() {
  const handleChipClicked = (chipId) => {
    console.info(`You clicked the ${chipId} Chip.`);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "200px",
      }}
    >
      <MyChipComponent
        isSelected={true}
        onClick={() => handleChipClicked(1)}
        label="All"
      />
      <MyChipComponent onClick={() => handleChipClicked(2)} label="Music" />
      <MyChipComponent onClick={() => handleChipClicked(3)} label="Podcasts" />
    </div>
  );
}

export default SubTopBar;
