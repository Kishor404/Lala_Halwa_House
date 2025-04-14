import axios from "axios";
import Cookies from 'js-cookie';
import StoreData from "./StoreData";

const API_URL = process.env.REACT_APP_API_URL;


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

let cartData = [];
const aToken = await refreshAccessToken();
try {
  const response = await axios.get(API_URL+"/cart/", {
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

  // Handle error here, e.g., show a message to the user

  cartData=[{"id": 1,"user": 1,"created_at": "2025-04-09T01:02:41.013212Z","items": [
        {
            "id": 1,
            "product": 1,
            "product_name": "Error",
            "quantity": 1,
            "price": "0",
            "total_price": 0
        }
    ],
    "total_items": 1,
    "total_price": 0
}]


}
console.log("cartData", cartData);

export default cartData;
