import React, { useState } from "react";
import "./whishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from 'axios';
import Cookies from 'js-cookie';
import WhishlistData from './../../Data/WhishlistData';


const API_URL = process.env.REACT_APP_API_URL;

const Whishlist = () => {

  // =========================== REFRESH TOKEN ==============================

  const refreshAccessToken = async () => {
    try {
      const refresh = Cookies.get('rToken');
  
      if (!refresh) {
        throw new Error('No refresh token found');
      }
  
      const response = await axios.post(API_URL+'/log/token/refresh/', {
        refresh: refresh,
      });
  
      const newAccess = response.data.access;
      const newRefresh = response.data.refresh;
      Cookies.set('access', newAccess, { expires: 7 }); // Store the new access token
      Cookies.set('rToken', newRefresh, { expires: 7 }); // Store the new access token
  
      console.log('Access token refreshed!');
      return newAccess;
  
    } catch (error) {
      console.error('Failed to refresh token:', error.response?.data || error.message);
      // localStorage.clear();
      // window.location.href = '/login';
  
      return null;
    }
  };

  //==========================================================================================

  //========================= ADD TO CART ====================================================

  const handleAddToCart = async(product) => {

    const data={"product":product, "quantity":1};
    const cart = Cookies.get('cart');
    const aToken = await refreshAccessToken();
    try {
      const response = await axios.post(API_URL+'/cart/'+cart+'/add_item/', data, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      console.log('Add To Cart Success:', response.data);
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {backgroundColor: "#07bc0c",color: "white",},
        iconTheme: {primary: "#fff",secondary: "#07bc0c",},
      });
      

    } catch (error) {
      console.error('Add To Cart Failed:', error.response?.data || error.message);
      toast.error("Error Occur! Try Again After Sometime", {
        duration: 2000,
        style: {backgroundColor: "#ff4b4b",color: "white",},
        iconTheme: {primary: "#fff",secondary: "#ff4b4b",},
      });
    }
  };

  //==========================================================================================

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const ITEMS_TO_SHOW = 8;

  return (
    <div className="whishlist-trendyMainContainer">
      {WhishlistData.slice(0, ITEMS_TO_SHOW)
        .reverse()
        .map((whish) => (
          <div className="whishlist-trendyProductContainer" key={whish.id}>
            <div className="whishlist-trendyProductImages">
              <Link to={`/product/${whish.product.id}`} onClick={scrollToTop}>
                <img
                  src={whish.product.image}
                  alt={whish.product.name}
                  className="whishlist-trendyProduct_front"
                />
                <img
                  src={whish.product.image}
                  alt={whish.product.name}
                  className="whishlist-trendyProduct_back"
                />
              </Link>
              <h4 onClick={() => handleAddToCart(whish.product.id)}>Add to Cart</h4>
            </div>

            <div
              className="whishlist-trendyProductImagesCart"
              onClick={() => handleAddToCart(whish.product.id)}
            >
              <FaCartPlus />
            </div>

            <div className="whishlist-trendyProductInfo">
              <div className="whishlist-trendyProductCategoryWishlist">
                <p>Dresses</p>
              </div>

              <div className="whishlist-trendyProductNameInfo">
                <Link to={`/product/${whish.product.id}`} onClick={scrollToTop}>
                  <h5>{whish.product.name}</h5>
                </Link>

                <p>₹{whish.product.price}</p>

                <div className="whishlist-trendyProductRatingReviews">
                  <div className="whishlist-trendyProductRatingStar">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color="#FEC78A" size={10} />
                    ))}
                  </div>
                  <span>{5}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Whishlist;