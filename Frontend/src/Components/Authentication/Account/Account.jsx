import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { FaBoxOpen, FaShoppingCart, FaChartBar, FaEnvelope } from 'react-icons/fa';

import Cookies from 'js-cookie';
import './Account.css';

const Account = () => {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    address: '',
    landmark: '',
    pincode: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('login') !== '1') {
      navigate('/loginSignUp');
    } else {
      setUserData({
        name: Cookies.get('username') || 'None',
        phone: Cookies.get('userphone') || '',
        email: Cookies.get('useremail') || '',
        country: Cookies.get('userAddressCountry') || '',
        state: Cookies.get('userAddressState') || '',
        address: Cookies.get('userAddress1') || '',
        landmark: Cookies.get('userLandmark') || '',
        pincode: Cookies.get('userPincode') || ''
      });
    }
  }, [navigate]);

  const handleLogout=()=>{
    Cookies.remove('login');
    Cookies.remove('username');
    Cookies.remove('userphone');
    Cookies.remove('useremail');
    Cookies.remove('userAddressCountry');
    Cookies.remove('userAddressState');
    Cookies.remove('userAddress1');
    Cookies.remove('userLandmark');
    Cookies.remove('userPincode');
    navigate("/loginSignUp");
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    alert('Details updated successfully!');
  };

  return (
    <div className="contact-account-layout">
      <aside className="contact-sidebar">
        <div className="contact-profile">
        <div className="contact-avatar"><span>{userData.name.charAt(0)}</span></div>

          <div className="contact-name">{userData.name}</div>
          <div className="contact-phone">{userData.phone}</div>
        </div>
        <nav className="contact-nav">
  <button className="contact-nav-btn active"><FaBoxOpen /> Orders History</button>
  <button className="contact-nav-btn"><FaShoppingCart /> View Cart</button>
  <button className="contact-nav-btn"><FaChartBar /> Feedbacks</button>
  <div className="contact-support">Support</div>
  <button className="contact-nav-btn"><FaEnvelope /> Contact Us</button>
</nav>
        <button className="contact-logout-side" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="contact-account-content">
        <div className="contact-account-header">
          <h2>Account</h2>
          <button className="contact-logout-main" onClick={handleLogout}>Logout</button>
        </div>
        <p className="contact-subtitle">Review and update your account details</p>
        <p className="contact-description">Please make sure these details are up to date as they'll be used for your orders and communication with the hotels.</p>

        <div className="contact-account-card">
          <div className="contact-account-info">
          <span className="contact-icon"><FaUserEdit  /></span>
            <div>
              <h3>{userData.name}</h3>
              <p>Please make sure these details are up to date as they'll be used for your orders and communication with the hotels.</p>
            </div>
          </div>

          <div className="contact-form-grid">
            <div className="contact-form-group">
              <label>Your Name</label>
              <input type="text" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>Phone</label>
              <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>Email</label>
              <input type="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>Country</label>
              <input type="text" name="country" value={userData.country} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>State</label>
              <input type="text" name="state" value={userData.state} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>Address</label>
              <input type="text" name="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>Landmark</label>
              <input type="text" name="landmark" value={userData.landmark} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={userData.pincode} onChange={handleChange} />
            </div>
          </div>

          <p className="contact-note">*Your data will be handled with care.</p>
          <div className="contact-update-btn-container">
  <button className="contact-update-btn" onClick={handleUpdate}>Update</button>
</div>

        </div>
      </main>
    </div>
  );
};

export default Account;
