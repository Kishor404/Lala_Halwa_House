import React, { useState } from "react";

import "./HeroSection.css";
import { Link } from "react-router-dom";

import logo from "../../../Assets/logo.png";

const HeroSection = () => {
  const [tshirtColor, setTshirtColor] = useState("red");

  const changeColor = (color) => {
    setTshirtColor(color);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="heroMain">
        <div className="sectionleft">
          <p>Ultimate Cravings</p>
          <h1>Taste The Premium Sweets</h1>
          <span>Limited Time Offer - Up to 60% off & Free Shipping</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Discover More</h5>
            </Link>
          </div>
        </div>
        <div className="sectionright">

          <img src={logo} alt="Logo"/>
          
        </div>
      </div>
    </>
  );
};

export default HeroSection;
