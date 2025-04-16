import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

let Products = [];
try {
  const response = await axios.get(API_URL+"/api/products/");
  Products = response.data;
} catch (error) {
  console.error("Failed:", error.response ? error.response.data : error.message);
}
console.log("Products", Products);

export default Products;
