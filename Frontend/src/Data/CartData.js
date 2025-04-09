import axios from "axios";
import Cookies from 'js-cookie';
import StoreData from "./StoreData";

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

let cartData = [];
const aToken = await refreshAccessToken();
try {
  const response = await axios.get("http://127.0.0.1:8000/cart/", {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
  });
  cartData = response.data;
  cartData[0].items.forEach((item) => {
    const product = StoreData.find((product) => product.productID === item.product);
    if (product) {
      item.frontImg = product.frontImg;
      item.productName = product.productName;
      item.franchise = product.Franchise.name+", " + product.Franchise.location;
      item.productReviews = product.productReviews;
    }
  });
} catch (error) {
  console.error("Failed:", error.response ? error.response.data : error.message);
}
console.log("cartData", cartData);

export default cartData;
