import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import MyInput from "../Components/MyInput";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

function LoginScreen() {
  const navigate = useNavigate();
  const { clearError, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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

  useEffect(() => {
    clearError();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    console.log(event.target);
    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };
  const handleInputPasswordChange = (event) => {
    const { value } = event.target;
    console.log(event.target);
    setFormData((prevData) => ({
      ...prevData,
      password: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const MyForm = () => {
    return (
      <form className="my_login_form">
        <MyInput
          label={"Email"}
          type={"email"}
          value={formData?.email}
          onChange={handleInputChange}
        />
        <MyInput
          label={"Password"}
          type={"password"}
          onChange={handleInputPasswordChange}
          value={formData?.password}
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
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Log in to Spotify
          </h1>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <GoogleLoginButton />
        </div>

        <hr style={{ width: "100%", border: "1px solid #3833336b" }} />
        <MyForm />
        <span style={{ margin: "30px 0px", fontSize: "14px" }}>
          Don't Have an Account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {" "}
            Sign up now!
          </span>
        </span>
      </div>
    </div>
  );
}

export default LoginScreen;
