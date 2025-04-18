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
    <div className="Account-account-layout">
      <aside className="Account-sidebar">
        <div className="Account-profile">
        <div className="Account-avatar"><span>{userData.name.charAt(0)}</span></div>

          <div className="Account-name">{userData.name}</div>
          <div className="Account-phone">{userData.phone}</div>
        </div>


        {/* ========== MObile ========== */}

        

        <main className="Account-account-content Account-account-content-mobile">
        <button className="Account-logout-main Account-logout-main-mobile" onClick={handleLogout}>Logout</button>
        <div className="Account-account-card Account-account-card-mobile">
          <div className="Account-account-info">
          <span className="Account-icon"><FaUserEdit  /></span>
            <div>
              <h3>{userData.name}</h3>
              <p>Please make sure these details are up to date as they'll be used for your orders and communication with the hotels.</p>
            </div>
          </div>

          <div className="Account-form-grid Account-form-grid-mobile">
            <div className="Account-form-group">
              <label>Your Name</label>
              <input type="text" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Phone</label>
              <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Email</label>
              <input type="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Country</label>
              <input type="text" name="country" value={userData.country} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>State</label>
              <input type="text" name="state" value={userData.state} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Address</label>
              <input type="text" name="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Landmark</label>
              <input type="text" name="landmark" value={userData.landmark} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={userData.pincode} onChange={handleChange} />
            </div>
          </div>

          <p className="Account-note">*Your data will be handled with care.</p>
          <div className="Account-update-btn-container Account-update-btn-container-mobile">
            <button className="Account-update-btn" onClick={handleUpdate}>Update</button>
          </div>

        </div>
      </main>

      {/* ================================= */}

      
        <nav className="Account-nav">
          <button className="Account-nav-btn active Account-nav-btn-mobile"><FaBoxOpen /> Orders History</button>
          <button className="Account-nav-btn Account-nomobile"><FaShoppingCart /> View Cart</button>
          <button className="Account-nav-btn Account-nav-btn-mobile"><FaChartBar /> Feedbacks</button>
          <div className="Account-support Account-nomobile">Support</div>
          <button className="Account-nav-btn Account-nomobile"><FaEnvelope /> Contact Us</button>
        </nav>
        <button className="Account-logout-side Account-nomobile" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="Account-account-content">
        <div className="Account-account-header">
          <h2>Account</h2>
          <button className="Account-logout-main" onClick={handleLogout}>Logout</button>
        </div>
        <p className="Account-subtitle">Review and update your account details</p>
        <p className="Account-description">Please make sure these details are up to date as they'll be used for your orders and communication with the hotels.</p>

        <div className="Account-account-card">
          <div className="Account-account-info">
          <span className="Account-icon"><FaUserEdit  /></span>
            <div>
              <h3>{userData.name}</h3>
              <p>Please make sure these details are up to date as they'll be used for your orders and communication with the hotels.</p>
            </div>
          </div>

          <div className="Account-form-grid">
            <div className="Account-form-group">
              <label>Your Name</label>
              <input type="text" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Phone</label>
              <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Email</label>
              <input type="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Country</label>
              <input type="text" name="country" value={userData.country} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>State</label>
              <input type="text" name="state" value={userData.state} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Address</label>
              <input type="text" name="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Landmark</label>
              <input type="text" name="landmark" value={userData.landmark} onChange={handleChange} />
            </div>
            <div className="Account-form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={userData.pincode} onChange={handleChange} />
            </div>
          </div>

          <p className="Account-note">*Your data will be handled with care.</p>
          <div className="Account-update-btn-container">
            <button className="Account-update-btn" onClick={handleUpdate}>Update</button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Account;
