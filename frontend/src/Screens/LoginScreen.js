import React from "react";
import "./LoginScreen.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import MyInput from "../Components/MyInput";
import Button from "@mui/material/Button";

function LoginScreen() {
  const GoogleLoginButton = () => {
    return (
      <div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    );
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const MyForm = () => {
    return (
      <form className="my_login_form" onSubmit={handleSubmit}>
        <MyInput label={"Email"} type={"email"} onChange={handleInputChange} />
        <MyInput
          label={"Password"}
          type={"password"}
          onChange={handleInputChange}
        />
        <Button className="login_button">Log In</Button>
      </form>
    );
  };
  return (
    <div className="LoginScreen">
      <div className="login_info_box">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img src="spotify.png" alt="" />
          <h1>Log in to Spotify</h1>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <GoogleLoginButton />
        </div>
        <hr style={{ width: "100%", border: "1px solid #3833336b" }} />
        <MyForm />
        <span style={{ margin: "30px 0px", fontSize: "14px" }}>
          Don't Have an Account?{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            {" "}
            Sign up now!
          </span>
        </span>
      </div>
    </div>
  );
}

export default LoginScreen;
