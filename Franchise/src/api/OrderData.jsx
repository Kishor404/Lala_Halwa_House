import axios from "axios";

let OrderData = [];
try {
  const response = await axios.get("http://127.0.0.1:8000/orders/");
  OrderData= response.data;
} catch (error) {
  console.error("Failed:", error.response ? error.response.data : error.message);
}
console.log("OrderData", OrderData);

export default OrderData;