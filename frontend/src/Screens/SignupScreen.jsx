import React, { useEffect, useState } from "react";
import "./SignupScreen.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Step2 from "../Components/Step2";
import Step1 from "../Components/Step1";
import Step3 from "../Components/Step3";
import Step4 from "../Components/Step4";
import { motion } from "framer-motion";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useAuthStore from "../stores/authStore";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function SignupScreen() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    favourites: [],
  });
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

  const { signup, isLoading, error } = useAuthStore();

  useEffect(() => {
    if (error) {
      handleClick();
    }
  }, [error]);

  const navigate = useNavigate();
  const GoogleLoginButton = () => {
    return (
      <div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {}}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    );
  };
  const getLoader = () => {
    return (
      <div className="music_loader_container">
        <img
          style={{ width: "150px", height: "150px" }}
          src="music_loading.gif"
          alt="loading..."
        />
        <div>
          <h3 style={{ margin: "0px" }}>Setting up your Account</h3>
        </div>
      </div>
    );
  };
  const step1NextClicked = (email) => {
    setFormData({ ...formData, email: email });
    nextStep();
  };

  const step2NextClicked = (password) => {
    setFormData({ ...formData, password: password });
    nextStep();
  };
  const step3NextClicked = (data) => {
    setFormData({
      ...formData,
      name: data?.name,
      day: data?.day,
      month: data?.month,
      year: data?.year,
      gender: data?.gender,
    });
    nextStep();
  };
  const step4NextClicked = () => {
    signup(formData);
  };
  const step4SelectedCards = (data) => {
    setFormData({ ...formData, favourites: data });
  };
  const nextStep = () => {
    if (step === 3) {
      setProgress(progress + 10);
    } else {
      setProgress(progress + 45);
    }
    setStep(step + 1);
  };
  const prevStep = () => {
    if (step === 4) setProgress(progress - 10);
    else setProgress(progress - 45);
    step > 1 && setStep(step - 1);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            value={formData.email}
            nextClicked={step1NextClicked}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            value={formData.password}
            nextClicked={step2NextClicked}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <Step3
            nextClicked={step3NextClicked}
            nextStep={nextStep}
            alreadySelectedData={formData}
          />
        );
      case 4:
        return (
          <Step4
            nextClicked={step4NextClicked}
            alreadySelectedFavourites={formData?.favourites}
            selectFavourites={step4SelectedCards}
            error={error}
          />
        );
      default:
        return null;
    }
  };
  const getDirectLogin = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "20px 0px",
          }}
        >
          <hr style={{ width: "100%", border: "1px solid #3833336b" }} />
          <span style={{ margin: "0px 30px" }}>Or</span>
          <hr style={{ width: "100%", border: "1px solid #3833336b" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <GoogleLoginButton />
        </div>

        <span
          style={{ margin: "30px 0px", fontSize: "14px", textAlign: "center" }}
        >
          Already Have an Account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {" "}
            Log in now!
          </span>
        </span>
      </div>
    );
  };
  const getBackContainer = () => {
    var title = "Create a Password";
    switch (step) {
      case 2:
        title = "Create a Password";
        break;
      case 3:
        title = "Tell us about yourself";
        break;
      case 4:
        title = "Select your Favourites";
        break;

      default:
        title = "Create a Password";
    }
    return (
      <div className="steps_title">
        <div style={{ cursor: "pointer" }} onClick={() => prevStep()}>
          <ArrowBackIosIcon />
        </div>
        <div>
          <span style={{ color: "grey" }}>Step {step - 1} of 3</span>
          <p>{title}</p>
        </div>
      </div>
    );
  };
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

  return (
    <div className="signup">
      <div className="signup_box">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            width: "100%",
            position: "relative",
          }}
        >
          <img src="spotify.png" alt="" />
          {step === 1 ? (
            <h1>Sign up to start listening</h1>
          ) : (
            <Box sx={{ width: "100%", margin: "20px 0px" }}>
              <LinearProgress
                sx={{
                  height: 3, // Adjust this value for the height
                  borderRadius: 5, // Make edges circular
                  backgroundColor: "grey", // Background color of the progress bar
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#1ed760", // Progress color
                    borderRadius: 3, // Circular edges on the progress bar itself
                  },
                }}
                variant="determinate"
                value={progress}
              />
            </Box>
          )}
          {isLoading && <div>{getLoader()}</div>}
        </div>
        {step !== 1 && (
          <div style={{ display: "flex", alignItems: "start", width: "100%" }}>
            {getBackContainer()}
          </div>
        )}
        <div>
          <motion.div
            key={step}
            initial={{ clipPath: "inset(0 0 100% 0)" }} // Start fully clipped from the bottom
            animate={{ clipPath: "inset(0 -37px 0 0)" }} // Reveal fully from top to bottom
            exit={{ clipPath: "inset(0 0 100% 0)" }} // Wipe out back to the bottom
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </div>

        {step === 1 && getDirectLogin()}
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
    </div>
  );
}

export default SignupScreen;
