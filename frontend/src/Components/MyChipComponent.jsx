import { Chip } from "@mui/material";
import React from "react";

function MyChipComponent({ label, onClick, isSelected }) {
  return (
    <>
      <Chip
        onClick={onClick}
        sx={{
          color: isSelected ? "#222" : "#fff",
          backgroundColor: isSelected ? "#fff" : "hsla(0, 0%, 100%, .1)",
          "&:hover": {
            backgroundColor: isSelected ? "#fff" : "hsla(0, 0%, 100%, .1)",
            color: isSelected ? "#222" : "#fff",
            cursor: "pointer",
          },
        }}
        label={label}
      />
    </>
  );
}

export default MyChipComponent;
