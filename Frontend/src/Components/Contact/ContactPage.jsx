import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank You ${name} for Contacting Us. We will Get Back to You Soon.\n\nYour Mail Id - ${email}.\nYour Message is - ${message}`
    );
    setname("");
    setEmail("");
    setmessage("");
  };

  return (
    <>
      <div className="contactSection">
        <h2>Contact Us</h2>
        <div className="contactMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.0033011915607!2d77.63072787585281!3d9.50844138129824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06dcb6611614c5%3A0xfebbe54cd47c5ad4!2sVijayaLakshmi%20Lala%20Sweets%20%26%20Bakers!5e0!3m2!1sen!2sin!4v1744202976401!5m2!1sen!2sin"
            width="800"
            height="600"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="uomomap"
          ></iframe>
        </div>
        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>Store in Srivilliputhur</h3>
              <p>
                48/6 East Car Street,
                <br/> Andal Temple Main Entrance Left
                <br/> Corner Shop,
                <br /> Srivilliputtur - 626 125
              </p>
              <p>
                admin@dummymail.com
                <br />
                +91 98650 75400
              </p>
            </div>
            <div className="address">
              <h3>Store in Rajapalayam</h3>
              <p>
                48/6 East Car Street,
                <br/> Andal Temple Main Entrance Left
                <br/> Corner Shop,
                <br /> Srivilliputtur - 626 125
              </p>
              <p>
                contact@dummymail.com
                <br />
                +91 98650 75400
              </p>
            </div>
          </div>
          {/* <div className="contactForm">
            <h3>Get In Touch</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Name *"
                onChange={(e) => setname(e.target.value)}
                required
              />
              <input
                type="email"
                value={email}
                placeholder="Email address *"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                rows={10}
                cols={40}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
