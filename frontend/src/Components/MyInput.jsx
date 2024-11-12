import React from "react";
import "./MyInput.css";

function MyInput({ label, type, onChange, value, placeholder, width }) {
  return (
    <div className="myinput">
      {label && <label>{label}</label>}
      <div className="myinput_without_label">
        <input
          style={{ width: width }}
          value={value || ""}
          type={type}
          onChange={onChange}
          placeholder={label || placeholder}
        />
      </div>
    </div>
  );
}

export default MyInput;
