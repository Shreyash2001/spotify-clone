import { Button } from "@mui/material";
import React from "react";
import "./MyButton.css";

function MyButton({ label, onClick, isDisabled }) {
  return (
    <Button
      className={`${
        isDisabled ? "my_login_button_disabled" : "my_login_button_active"
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default MyButton;
