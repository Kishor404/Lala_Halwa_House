import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const navigate = useNavigate();

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
      const response = await axios.post(API_URL+"/log/login/", loginData);
      console.log("Login Successful:", response.data);
  
      // Store token in localStorage
      Cookies.set("rToken", response.data.refresh, { expires: 7 });
      Cookies.set("cart", response.data.user.cart, { expires: 7 });
      Cookies.set("userid", response.data.user.id, { expires: 7 });
      Cookies.set("username", response.data.user.name, { expires: 7 });
      Cookies.set("userphone", response.data.user.phone, { expires: 7 });
      Cookies.set("userAddressCity", response.data.user.address.city, { expires: 7 });
      Cookies.set("userAddress1", response.data.user.address.address1, { expires: 7 });
      Cookies.set("userAddressCountry", response.data.user.address.country, { expires: 7 });
      Cookies.set("userAddressLandmark", response.data.user.address.landmark, { expires: 7 });
      Cookies.set("userAddressPincode", response.data.user.address.pinCode, { expires: 7 });
      Cookies.set("userAddressState", response.data.user.address.state, { expires: 7 });
      Cookies.set("login","1",{ expires: 7 })

      navigate("/Account");
      
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
        const response = await axios.post(API_URL+"/log/register/", data);
        console.log("Register Successful:", response.data);
    
        // Store token in localStorage
        Cookies.set("rToken", response.data.refresh);
        Cookies.set("cart", response.data.user.cart, { expires: 7 });
        Cookies.set("userid", response.data.user.id, { expires: 7 });
        Cookies.set("username", response.data.user.name, { expires: 7 });
        Cookies.set("userphone", response.data.user.phone, { expires: 7 });
        Cookies.set("login","1",{ expires: 7 })
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
