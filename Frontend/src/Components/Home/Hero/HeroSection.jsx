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
          <p>Eternal Root's</p>
          <h1>Taste The Orginal Sweets</h1>
          <span>Lala Halwa Karan - The Traditional Halwa Shop</span>
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
