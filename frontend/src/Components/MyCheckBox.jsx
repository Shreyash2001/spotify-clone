import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const StyledCheckbox = styled(Checkbox)(({ theme, checked }) => ({
  width: 16,
  height: 16,
  padding: 0,
  position: "relative",
  borderRadius: "50%",
  border: "1px solid rgba(255, 255, 255, 0.532)",

  "&:hover": {
    borderColor: "#1ed760",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: checked ? "#1ed760" : "transparent",
    transition: "background-color 0.3s ease",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: "#222",
    transform: "translate(-50%, -50%)",
    opacity: checked ? 1 : 0,
    transition: "opacity 0.3s ease",
  },

  "& .MuiSvgIcon-root": {
    display: "none",
  },
}));

const MyCheckBox = ({id, isChecked, handleChange }) => {
  return (
    <StyledCheckbox
      checked={isChecked}
      onChange={() => handleChange(id)}
      disableRipple
      sx={{
        "& .MuiSvgIcon-root": {
          display: "none",
        },
      }}
    />
  );
};

export default MyCheckBox;
