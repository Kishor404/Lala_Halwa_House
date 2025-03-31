import "./HeroSection.css";
import { Link } from "react-router-dom";

import sweet from "../../../Assets/homesweet.png";

const HeroSection = () => {

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
          <span>Lala Halwa House - The House Of Sweets</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Discover More</h5>
            </Link>
          </div>
        </div>
        <div className="sectionright">

          <img src={sweet} alt="Sweet"/>
          
        </div>
      </div>
    </>
  );
};

export default HeroSection;
