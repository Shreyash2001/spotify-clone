import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import MyInput from "../Components/MyInput";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function LoginScreen() {
  const navigate = useNavigate();
  const { clearError, login, error, success } = useAuthStore();
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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      handleClick();
    }
  }, [error]);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

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
    login(formData);
  };

  const MyForm = () => {
    return (
      <form className="my_login_form" onSubmit={handleSubmit}>
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
        <Button type="submit" className="login_button">
          Log In
        </Button>
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

        <hr
          style={{ width: "100%", border: "1px solid rgba(56, 51, 51, 0.15)" }}
        />
        {MyForm()}
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginScreen;
