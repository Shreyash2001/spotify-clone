import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import MyButton from "./MyButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { coverImage } from "../utils/utility";
import { useNavigate } from "react-router-dom";

function Step4({
  selectFavourites,
  alreadySelectedFavourites,
  nextClicked,
  error,
}) {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const getLanguageCard = (data) => {
    return (
      <motion.div
        onClick={() => handleAddFavorite(data?.id)}
        whileHover={{ scale: 1.1 }}
        style={{
          position: "relative",
          width: "120px",
          height: "100px",
          cursor: "pointer",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={data.src}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <h4>{data.title}</h4>
          {favourites.length > 0 && favourites?.includes(data?.id) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }} // Adjust duration for fade speed
              style={{
                width: "80px",
                height: "80px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%", // Makes it a circle
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Centers the icon
                color: "white",
              }}
            >
              <CheckCircleIcon style={{ fontSize: "60px", color: "#1ed760" }} />{" "}
              {/* Adjust icon size */}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const handleAddFavorite = (id) => {
    if (favourites.length > 0 && favourites?.includes(id)) {
      const data = favourites.filter((item) => item !== id);
      setFavourites(data);
      selectFavourites(data);
    } else {
      setFavourites([...favourites, id]);
      selectFavourites([...favourites, id]);
    }
  };
  useEffect(() => {
    setFavourites(alreadySelectedFavourites);
  }, [alreadySelectedFavourites]);
  return (
    <div style={{ maxWidth: "300px", margin: "20px 0px" }}>
      <Box sx={{ flexGrow: 1, marginBottom: "40px", marginLeft: "10px" }}>
        <Grid2
          container
          spacing={{ xs: 5, md: 5 }}
          columns={{ xs: 3, sm: 6, md: 9 }}
        >
          {coverImage.map((data, index) => (
            <Grid2 xs={1} sm={2} md={3} key={index}>
              {getLanguageCard(data)}
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyButton
          onClick={nextClicked}
          label={"Complete"}
          isDisabled={favourites.length > 0 ? false : true}
        />
      </div>
      {error?.includes("User already") && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <p style={{ color: "#fff", fontFamily: "Questrial" }}>
            Already User?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "Questrial",
                fontWeight: "500",
              }}
            >
              {" "}
              Login Now
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Step4;
