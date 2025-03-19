import React from "react";
import "./Services.css";

import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiShieldCheckLine } from "react-icons/ri";

const Services = () => {
  return (
    <>
      <div className="services">
        <div className="serviceBox">
          <FaCartFlatbedSuitcase size={50} style={{ marginBottom: "20px" }} />
          <h3>Fast Delivery</h3>
          <p>Quick Delivery To Your Door Steps</p>
        </div>
        <div className="serviceBox">
          <TfiHeadphoneAlt size={50} style={{ marginBottom: "20px" }} />
          <h3>24/7 Customer Support</h3>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="serviceBox">
          <RiShieldCheckLine size={50} style={{ marginBottom: "20px" }} />
          <h3>Secure Purchasing</h3>
          <p>Purchase Are More Secure</p>
        </div>
      </div>
    </>
  );
};

export default Services;
