import React, { useState } from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import StoreData from "../../../Data/StoreData";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

const RelatedProducts = () => {
  const [wishList, setWishList] = useState({});

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

   // =========================== REFRESH TOKEN ==============================

   const refreshAccessToken = async () => {
    try {
      const refresh = Cookies.get('rToken');
  
      if (!refresh) {
        throw new Error('No refresh token found');
      }
  
      const response = await axios.post('http://localhost:8000/api/log/token/refresh/', {
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
      const response = await axios.post('http://localhost:8000/api/cart/'+cart+'/add_item/', data, {
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
      <div className="relatedProductSection">
        <div className="relatedProducts">
          <h2>
            RELATED <span>PRODUCTS</span>
          </h2>
        </div>
        <div className="relatedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
              },
            }}
          >
            {StoreData.slice(0, 8).map((product) => {
              return (
                <SwiperSlide key={product.productID}>
                  <Link className="rpContainer" state={{ product }} onClick={scrollToTop}>
                    <div className="rpImages">
                      <img
                        src={product.frontImg}
                        alt={product.productName}
                        className="rpFrontImg"
                      />
                      <img
                        src={product.frontImg}
                        className="rpBackImg"
                        alt={product.productName}
                      />
                      <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
                    </div>

                    <div className="relatedProductInfo">
                      <div className="rpCategoryWishlist">
                        <p>Dresses</p>
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
                      <div className="productNameInfo">
                        <h5 onClick={scrollToTop}>{product.productName}</h5>
                        <p>${product.productPrice}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
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
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
