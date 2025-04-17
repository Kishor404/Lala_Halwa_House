import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-section">
      <h2 className="section-title">Contact Us</h2>
      <div className="contact-container">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.0033011915607!2d77.63072787585281!3d9.50844138129824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06dcb6611614c5%3A0xfebbe54cd47c5ad4!2sVijayaLakshmi%20Lala%20Sweets%20%26%20Bakers!5e0!3m2!1sen!2sin!4v1744202976401!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="store-location"
          ></iframe>
        </div>
        <div className="store-details">
          <h3>Store In Chennai</h3>
          <p>
            48/6 East Car Street, <br />
            Andal Temple Main Entrance Left <br />
            Corner Shop, <br />
            Srivilliputtur – 626 125
          </p>
          <p>
            admin@dummymail.com <br />
            +91 98650 75400
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
