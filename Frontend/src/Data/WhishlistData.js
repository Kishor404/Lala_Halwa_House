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

let WhishlistData = [];
const aToken = await refreshAccessToken();
try {
  const response = await axios.get(API_URL+"/whishlist/", {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
  });
  WhishlistData = response.data;
} catch (error) {
  console.error("Failed:", error.response ? error.response.data : error.message);

  // Handle error here, e.g., show a message to the user


}
console.log("WhishlistData", WhishlistData);

export default WhishlistData;
