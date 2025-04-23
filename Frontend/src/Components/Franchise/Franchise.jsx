import React from "react";
import "./Franchise.css";
import { BiExpand } from "react-icons/bi";
import { BiSolidCard } from "react-icons/bi";
import { BiLogoAudible } from "react-icons/bi";
import { BsCalculatorFill } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { BiPackage } from "react-icons/bi";
import { BiSolidHot } from "react-icons/bi";
import { BiSolidLeaf } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
import sweetshop from "../../Assets/sweetshop.png";

const Franchise = () => {
  const requirements = [
    {name:"10ft x 10ft Shop",icon:<BiExpand className="franchise-icon-element"/>},
    {name:"4ft Display Counter x 2",icon:<BiSolidCard className="franchise-icon-element" />},
    {name:"Weighing Scale",icon:<BiLogoAudible className="franchise-icon-element" />},
    {name:"Billing Machine",icon:<BsCalculatorFill className="franchise-icon-element" />},
    {name:"Sealing Machine",icon:<BiPackage className="franchise-icon-element" />},
    {name:"Name Board ACP",icon:<BiRename className="franchise-icon-element" />},
    {name:"Interior",icon:<BiSolidBuildingHouse className="franchise-icon-element" />},
    {name:"Packing Materials",icon:<BsBoxSeam className="franchise-icon-element" />},
    {name:"Halwa Warmer",icon:<BiSolidHot className="franchise-icon-element" />},
    {name:"Opening Stock",icon:<BiSolidDashboard className="franchise-icon-element" />},
    {name:"Renewable Energy every 2 Years",icon:<BiSolidLeaf className="franchise-icon-element" />},
  ];

  const franchisePoints = [
    "Premium Quality You Can Trust - we take immense pride in delivering only the highest quality sweets. Every product is crafted with top-grade ingredients, ensuring an authentic and indulgent experience for your customers.",
    "Authentic Traditional Taste - Our recipes have been passed down through generations, preserving the rich, traditional South Indian flavors that have made us a household name. We stay true to our roots while continuously delighting modern palates.",
    "Ethnic Preparation Methods - We follow time-honored, ethnic methods of halwa preparation that enhance flavor, texture, and aroma—setting us apart in the sweet industry.",
    "Better Cost, Better Margins - We offer cost-effective franchising solutions that help you maintain competitive pricing while ensuring healthy profit margins. Our optimized production and supply chain model keeps your investment efficient.",
    "100% Natural - No Preservatives - Our sweets are completely free from preservatives, making them a healthier and more appealing choice for today's conscious customers. Freshness and purity are at the heart of everything we do.",
    "Backed by 3 Dedicated Mass Production Units - We operate three fully equipped mass production units to ensure consistent supply, premium quality, and the ability to meet high demand during peak seasons and festivals.",
    "Lightning-Fast Delivery System - Speed matters in business. Our robust logistics and delivery network ensure that your inventory is always stocked, fresh, and on time—giving you a hassle-free operating experience.",
  ];

  return (
    <div className="franchise-blogDetailsSectionContainer">
      {/* Banner Section */}
      <div className="franchise-banner">
        <div className="franchise-triangle1"></div>
        <div className="franchise-triangle2"></div>
        <div className="franchise-triangle3"></div>
        <div className="franchise-bannerText">Lala's Halwa Karan Franchise</div>
      </div>

      {/* Franchise Policy Section */}
      <section className="franchise-franchisePolicySection">
        <h2>About Our Franchise Policy</h2>
        <p>
        LALA's Halwakaran is a heritage-rich sweet shop brand known for its traditional South Indian sweets, especially its legendary halwa. With a legacy of over four generations, LALA’s has become a symbol of authentic taste, premium quality, and unmatched craftsmanship in sweet making. We specialize in delivering a nostalgic culinary experience by combining age-old recipes with modern production techniques. Each sweet is made using ethnic preparation methods, pure ingredients, and no preservatives, ensuring a wholesome and delicious bite every time. With three state-of-the-art mass production units, LALA's Halwakaran ensures consistent quality, scalability, and timely delivery. Our mission is to spread the joy of traditional sweets across India by empowering passionate entrepreneurs through our franchise model. Whether it's for a festive celebration or a casual indulgence, LALA’s sweets bring families together with the warmth of tradition and the taste of home.
        </p>
      </section>

      {/* Requirements Section */}
      <h2 className="franchise-requirementsTitle">Requirements for Setup</h2>
      <div className="franchise-requirementsGrid">
        {requirements.map((req, index) => (
          <div key={index} className="franchise-requirementItem">
            <div className="franchise-icon">
              {req.icon}
            </div>
            <p className="franchise-requirementText">{req.name}</p>
          </div>
        ))}
      </div>

      {/* Why Franchise Section */}
      <section className="franchise-whyFranchiseSection">
        <h2 className="franchise-whyFranchiseTitle">
          Why Franchise With Lala's Halwa Karan
        </h2>
        <ul className="franchise-whyFranchiseList">
          {franchisePoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Setup Franchise Section */}
      <section className="franchise-setupFranchiseSection">
        <h2 className="franchise-setupTitle">Setup Franchise</h2>
        <p className="franchise-setupDescription fullWidthText">
          A franchise is a type of business model where an individual or group
          (called the franchisee) is granted the rights by an established
          company (called the franchisor) to operate a business under the
          franchisor’s name, branding, and systems. A franchise is a type of
          business model where an individual or group is granted the rights by
          an established company to operate a business under the franchisor’s
          name, branding, and systems.
        </p>

        <div className="franchise-setupFranchiseWrapper">
          <div className="franchise-setupFormBox">
          <form>
            <div className="franchise-form-row three-cols">
              <div className="franchise-form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Enter your name" />
              </div>
              <div className="franchise-form-group">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" placeholder="Enter your phone" />
              </div>
              <div className="franchise-form-group">
                <label htmlFor="location">Location</label>
                <input id="location" type="text" placeholder="Enter your location" />
              </div>
            </div>

            <div className="franchise-form-row">
              <div className="franchise-form-group full-width">
                <label htmlFor="message">Message</label>
                <input id="message" type="text" placeholder="Type your message here" />
              </div>
            </div>

            <div className="franchise-noteAndButtonRow">
              <button type="submit">Setup</button>
              <p className="franchise-note">*Our staff will contact you soon</p>
            </div>

          </form>
          </div>
          <div className="franchise-setupImageBox">
            <img src={sweetshop} alt="Sweet Shop Setup" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
