import React, { useState } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from 'axios';
import Cookies from 'js-cookie';

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const sortByPrice = (a, b) => a.productPrice - b.productPrice;

  const sortByReviews = (a, b) => {
    const reviewsA = parseInt(
      a.productReviews.replace("k+ reviews", "").replace(",", "")
    );
    const reviewsB = parseInt(
      b.productReviews.replace("k+ reviews", "").replace(",", "")
    );
    return reviewsB - reviewsA;
  };

  const cartItems = useSelector((state) => state.cart.items);


  // =========================== REFRESH TOKEN ==============================

  const refreshAccessToken = async () => {
    try {
      const refresh = Cookies.get('rToken');
  
      if (!refresh) {
        throw new Error('No refresh token found');
      }
  
      const response = await axios.post('http://localhost:8000/log/token/refresh/', {
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

    const data={"product":product.productID, "quantity":1};
    const cart = Cookies.get('cart');
    const aToken = await refreshAccessToken();
    try {
      const response = await axios.post('http://localhost:8000/cart/'+cart+'/add_item/', data, {
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

  return (
    <>
      <div className="trendyProducts">
        <h2>
          Top Customer <span>Picks</span>
        </h2>
        <div className="trendyTabs">
          <div className="tabs">
            <p
              onClick={() => handleTabClick("tab1")}
              className={activeTab === "tab1" ? "active" : ""}
            >
              All
            </p>
            <p
              onClick={() => handleTabClick("tab2")}
              className={activeTab === "tab2" ? "active" : ""}
            >
              New Arrivals
            </p>
            <p
              onClick={() => handleTabClick("tab3")}
              className={activeTab === "tab3" ? "active" : ""}
            >
              Most Popular
            </p>
            <p
              onClick={() => handleTabClick("tab4")}
              className={activeTab === "tab4" ? "active" : ""}
            >
              Top Rated
            </p>
          </div>
          <div className="trendyTabContent">
            {/* Tab 1 */}
            {activeTab === "tab1" && (
              <div className="trendyMainContainer">
                {StoreData.slice(0, 5).map((product) => (
                  <div className="trendyProductContainer" key={product.id}>
                    <div className="trendyProductImages">
                      <Link to="/Product" state={{ product }} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt=""
                          className="trendyProduct_front"
                        />
                        <img
                          src={product.frontImg}
                          alt=""
                          className="trendyProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="trendyProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="trendyProductInfo">
                      <div className="trendyProductCategoryWishlist">
                        <p>Lala Halwa House</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product.productID)}
                          style={{
                            color: wishList[product.productID]
                              ? "red"
                              : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="trendyProductNameInfo">
                        <Link to="product" onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>

                        <p>₹{product.productPrice}</p>
                        <div className="trendyProductRatingReviews">
                          <div className="trendyProductRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>
                          <span>{product.productReviews}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2 */}
            {activeTab === "tab2" && (
              <div className="trendyMainContainer">
                {StoreData.slice(0, 5)
                  .reverse()
                  .map((product) => (
                    <div className="trendyProductContainer" key={product.id}>
                      <div className="trendyProductImages">
                        <Link to="/Product" onClick={scrollToTop}>
                          <img
                            src={product.frontImg}
                            alt=""
                            className="trendyProduct_front"
                          />
                          <img
                            src={product.frontImg}
                            alt=""
                            className="trendyProduct_back"
                          />
                        </Link>
                        <h4 onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </h4>
                      </div>
                      <div
                        className="trendyProductImagesCart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus />
                      </div>
                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>Dresses</p>
                          <FiHeart
                            onClick={() =>
                              handleWishlistClick(product.productID)
                            }
                            style={{
                              color: wishList[product.productID]
                                ? "red"
                                : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="product" onClick={scrollToTop}>
                            <h5>{product.productName}</h5>
                          </Link>

                          <p>₹{product.productPrice}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            <span>{product.productReviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Tab 3 */}
            {activeTab === "tab3" && (
              <div className="trendyMainContainer">
                {StoreData.slice(0, 5)
                  .sort(sortByReviews)
                  .map((product) => (
                    <div className="trendyProductContainer" key={product.id}>
                      <div className="trendyProductImages">
                        <Link to="/Product" onClick={scrollToTop}>
                          <img
                            src={product.frontImg}
                            alt=""
                            className="trendyProduct_front"
                          />
                          <img
                            src={product.frontImg}
                            alt=""
                            className="trendyProduct_back"
                          />
                        </Link>
                        <h4 onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </h4>
                      </div>
                      <div
                        className="trendyProductImagesCart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus />
                      </div>
                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>Dresses</p>
                          <FiHeart
                            onClick={() =>
                              handleWishlistClick(product.productID)
                            }
                            style={{
                              color: wishList[product.productID]
                                ? "red"
                                : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="product" onClick={scrollToTop}>
                            <h5>{product.productName}</h5>
                          </Link>

                          <p>₹{product.productPrice}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            <span>{product.productReviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Tab 4 */}
            {activeTab === "tab4" && (
              <div className="trendyMainContainer">
                {StoreData.slice(0, 5)
                  .sort(sortByPrice)
                  .map((product) => (
                    <div className="trendyProductContainer" key={product.id}>
                      <div className="trendyProductImages">
                        <Link to="/Product">
                          <img
                            src={product.frontImg}
                            alt=""
                            className="trendyProduct_front"
                          />
                          <img
                            src={product.frontImg}
                            alt=""
                            className="trendyProduct_back"
                          />
                        </Link>
                        <h4 onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </h4>
                      </div>
                      <div
                        className="trendyProductImagesCart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus />
                      </div>
                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>Dresses</p>
                          <FiHeart
                            onClick={() =>
                              handleWishlistClick(product.productID)
                            }
                            style={{
                              color: wishList[product.productID]
                                ? "red"
                                : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="/product" onClick={scrollToTop}>
                            <h5>{product.productName}</h5>
                          </Link>

                          <p>₹{product.productPrice}</p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            <span>{product.productReviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="discoverMore">
          <Link to="/shop" onClick={scrollToTop}>
            <p>Discover More</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Trendy;
