import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpg";
import about2 from "../../Assets/About/about-2.jpg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>About Us</h2>
        <img src={about1} alt="Lala Halwa" className="about-main-img" />
        <div className="aboutContent">
          <h3>Welcome to LALA's Sweet Family</h3>
          
          <p>
          <h4>
            Every bite tells a story of our traditional fame.
          </h4>
            We are proud to say that we represent the fourth generation carrying forward our quality and legacy into the fifth generation. The term "LALA" is often associated with Tirunelveli Halwa, likely
            stemming from the Rajputs of Chokkampatti who originally prepared it. Our beloved shop, known as "LALA KADAI", has stood as a symbol of taste and trust.
            We are the Eternal Roots of LALA's Halwa Family. Our journey is not just about sweets; it's about preserving a heritage, a tradition that has been passed down through generations. Every recipe we create is a testament to the love and dedication of our ancestors.
            Over the years, we have expanded our offerings to include a wide variety of sweets and savories, each crafted with the same passion and commitment to quality. Our customers are not just patrons; they are part of our extended family, sharing in the joy and nostalgia that our products bring. From festive occasions to everyday indulgences, LALA's Halwa Karan has been a part of countless cherished memories. We believe in creating not just sweets, but experiences that linger in the hearts of our customers forever.
          </p>

          <div className="content1">
            <div className="contentBox">
            <h5>Our Mission</h5>
            <p>
              To preserve the authentic taste of traditional halwa and sweets while embracing innovation for future generations. We aim to bring joy and happiness to every customer by delivering products that are crafted with care and precision.
              At Lala Halwa Shop, we are committed to upholding the rich legacy of Indian confectionery. Our mission goes beyond just making sweets — we strive to create memorable experiences with every bite. By combining age-old recipes with modern techniques, we ensure that our offerings remain relevant, delightful, and of the highest quality.
              We believe in sustainability, purity, and customer satisfaction. From sourcing the finest ingredients to maintaining hygienic production practices, our goal is to consistently exceed expectations. Whether it's a festive celebration, a family gathering, or a simple craving, we want to be a part of your sweetest moments.
            </p>

            </div>
            <div className="contentBox">
            <h5>Our Vision</h5>
            <p>
              To be a global symbol of Tirunelveli Halwa and Indian sweet craftsmanship, delivering love in every bite. We envision a future where our brand becomes synonymous with quality, trust, and the rich cultural heritage of Indian sweets.
              Our vision is to take the legacy of Tirunelveli Halwa beyond regional boundaries and establish a presence across the globe. We aim to become the go-to destination for authentic Indian sweets, where tradition meets taste in its purest form.
              As we grow, we aspire to inspire — by setting new benchmarks in the sweet industry, encouraging entrepreneurship through franchising, and nurturing local artisans who are the heart of our success. Every step we take is guided by our desire to celebrate and share the unique flavors of India with the world.
            </p>

            </div>
          </div>

          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="Traditional Making" />
            </div>
            <div className="textContent">
            <h5>The Lala's Halwa Karan</h5>
            <p>
              Rooted in legacy and powered by passion, LALA's Halwa Karan has been a cornerstone of tradition, delighting generations with unmatched flavor and quality. What began as a humble sweet shop has now grown into a trusted name that represents authenticity, craftsmanship, and heartfelt service.
              Our journey is built on strong family values, time-honored recipes, and an unwavering dedication to delivering excellence. Over the years, we have preserved the essence of traditional sweet-making while embracing innovation to cater to the tastes of modern consumers.
              From sourcing the finest ingredients to employing skilled artisans who follow age-old techniques, every step in our process is guided by precision, care, and a commitment to perfection. We believe that sweets are more than just food—they are a part of cherished memories, joyful celebrations, and everyday happiness.
              As we expand through franchising and online platforms, our goal remains the same: to share the magic of Tirunelveli Halwa and other beloved Indian sweets with the world, while staying true to the legacy that defines us. At LALA’s Halwa Karan, we don’t just make sweets — we craft timeless experiences.
            </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
