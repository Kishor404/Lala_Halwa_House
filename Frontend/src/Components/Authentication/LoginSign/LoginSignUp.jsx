import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  // =========== LOGIN ==================

  const [loginData, setLoginData] = useState({
    phone: "",
    password: ""
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async(e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    try {
      const response = await axios.post("http://127.0.0.1:8000/log/login/", loginData);
      console.log("Login Successful:", response.data);
  
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login Failed:", error.response ? error.response.data : error.message);
    }
  };

  // ========== REGISTER ==================

  const [registerData, setRegisterData] = useState({
    phone: "",
    password: "",
    con_password: "",
    address1: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",

  });

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitRegister = async(e) => {
    e.preventDefault();

    if(registerData.password==registerData.con_password){
      const data={phone:registerData.phone, password: registerData.password, address: {address1: registerData.address1, landmark: registerData.landmark, city: registerData.city, state: registerData.state, pinCode: registerData.pinCode, country: registerData.country}}
      console.log("Register Data:", data);
      try {
        const response = await axios.post("http://127.0.0.1:8000/log/register/", data);
        console.log("Register Successful:", response.data);
    
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.error("Login Failed:", error.response ? error.response.data : error.message);
      }
    }else{
      alert("Password Mismatch !")
    }
    
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">

            {/* ============== LOGIN -- TAB 1 ================= */}

            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleSubmitLogin}>
                  <input type="text" placeholder="Phone *" name="phone" value={loginData.phone} onChange={handleChangeLogin} required />
                  <input type="password" placeholder="Password *" name="password" value={loginData.password} onChange={handleChangeLogin} required />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button>Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* ============== REGISTER -- TAB 2 ================= */}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleSubmitRegister}>
                  <input type="text" placeholder="Phone *" name="phone" value={registerData.phone} onChange={handleChangeRegister} required />
                  <input type="password" placeholder="Password *" name="password" value={registerData.password} onChange={handleChangeRegister} required />
                  <input type="password" placeholder="Confrim Password *" name="con_password" value={registerData.con_password} onChange={handleChangeRegister} required />
                  <input type="text" placeholder="House No, Street, Apartment *" name="address1" value={registerData.address1} onChange={handleChangeRegister} required />
                  <input type="text" placeholder="Nearby landmark (optional)" name="landmark" value={registerData.landmark} onChange={handleChangeRegister}/>
                  <input type="text" placeholder="City *" name="city" value={registerData.city} onChange={handleChangeRegister} required/>
                  <input type="text" placeholder="State *" name="state" value={registerData.state} onChange={handleChangeRegister} required/>
                  <input type="text" placeholder="ZIP or PIN code *" name="pinCode" value={registerData.pinCode} onChange={handleChangeRegister} required/>
                  <input type="text" placeholder="Country *" name="country" value={registerData.country} onChange={handleChangeRegister} required/>
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button>Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
