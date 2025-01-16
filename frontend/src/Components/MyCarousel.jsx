import React, { useRef } from "react";
import "./MyCarousel.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MyCarousel({ children }) {
  const carouselRef = useRef(null);
  function sideScroll(element, direction, speed, distance, step) {
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction === "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  const rightScroll = () => {
    sideScroll(carouselRef.current, "right", 10, 1500, 20);
  };
  const leftScroll = () => {
    sideScroll(carouselRef.current, "left", 10, 1500, 20);
  };
  return (
    <div className="mycarousel-container">
      <div className="mycarousel-left-arrow" onClick={leftScroll}>
        <ArrowBackIosNewIcon
          style={{ fontSize: "25px", padding: "10px", margin: "0px" }}
        />
      </div>
      <div
        ref={carouselRef}
        id="mycarousel-children-container"
        className="mycarousel-children-container"
      >
        {children}
      </div>
      <div className="mycarousel-right-arrow" onClick={rightScroll}>
        <ArrowForwardIosIcon
          style={{ fontSize: "25px", padding: "10px", margin: "0px" }}
        />
      </div>
    </div>
  );
}

export default MyCarousel;
