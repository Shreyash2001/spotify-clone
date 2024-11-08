import React from "react";
import "./MyInput.css";

function MyInput({ label, type, onChange }) {
  return (
    <div className="myinput">
      <label>{label}</label>
      <input type={type} onChange={onChange} placeholder={label} />
    </div>
  );
}

export default MyInput;
