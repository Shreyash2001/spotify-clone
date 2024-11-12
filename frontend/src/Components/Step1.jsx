import React, { useEffect, useState } from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";

function Step1({ nextClicked, value }) {
  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState(false);
  const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  };
  const handleClick = () => {
    nextClicked(email);
  };

  useEffect(() => {
    setEmail(value);
    if (emailRegex.test(value)) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  }, [value]);
  return (
    <div>
      <MyInput
        value={email}
        type={"email"}
        label={"Email address"}
        onChange={handleChange}
      />
      <MyButton
        onClick={handleClick}
        isDisabled={validateEmail ? false : true}
        label={"Next"}
      />
    </div>
  );
}

export default Step1;
