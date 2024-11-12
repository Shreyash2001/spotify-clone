import React, { useEffect, useState } from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";

const satisfactionTitles = [
  "1 letter",
  "1 number or special character (example: # ? ! &)",
  "10 characters",
];
function Step2({ nextClicked, value }) {
  const [eachSatisfy, setEachSatisfy] = useState(new Set());
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const newSatisfy = new Set();

    // Condition 1: Contains at least 1 letter
    if (/[a-zA-Z]/.test(value)) {
      newSatisfy.add(1);
    }

    // Condition 2: Contains at least 1 number or special character
    if (/[0-9#?!&]/.test(value)) {
      newSatisfy.add(2);
    }

    // Condition 3: Minimum 10 characters
    if (value.length >= 10) {
      newSatisfy.add(3);
    }

    setEachSatisfy(newSatisfy);
  };

  useEffect(() => {
    if (value) {
      const newSatisfy = new Set();
      newSatisfy.add(1);
      newSatisfy.add(2);
      newSatisfy.add(3);
      setEachSatisfy(newSatisfy);
      setPassword(value);
    }
  }, [value]);

  return (
    <div>
      <MyInput
        value={password}
        label={"Password"}
        type={"password"}
        onChange={handleChange}
      />
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontWeight: "600" }}>Your password must contain at least</p>
        {[1, 2, 3].map((value, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "22px",
                border: `${
                  eachSatisfy.has(value)
                    ? "1px solid #37ff37"
                    : "1px solid lightgrey"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: `${
                  eachSatisfy.has(value) ? "#37ff37" : "transparent"
                }`,
              }}
            >
              <span
                style={{ fontSize: "9px", color: "black", fontWeight: "800" }}
              >
                ✓
              </span>
            </div>
            <span
              style={{
                marginLeft: "10px",
                fontSize: "12px",
                color: "grey",
                fontWeight: "800",
              }}
            >
              {satisfactionTitles[index]}
            </span>
          </div>
        ))}
      </div>
      <MyButton
        label={"Next"}
        onClick={() => nextClicked(password)}
        isDisabled={eachSatisfy.size !== 3}
      />
    </div>
  );
}

export default Step2;
