import axios from "axios";

// import Product_1 from "../Assets/Products/product_1.jpg";
// import Product_1_1 from "../Assets/Products/product_1-1.jpg";

// import limited1 from "../Assets/LimitedEdition/limited-1.jpg";
// import limited2 from "../Assets/LimitedEdition/limited-2.jpg";
// let StoreData = [
//   {
//     productID: 1,
//     frontImg: Product_1,
//     backImg: Product_1_1,
//     productName: "Sriviliputhur Palkova",
//     productPrice: 199,
//     productReviews: "8k+ reviews",
//   },
//   {
//     productID: 2,
//     frontImg: Product_1,
//     backImg: Product_1_1,
//     productName: "Calvin Shorts",
//     productPrice: 62,
//     productReviews: "2k+ reviews",
//   },
// ];

const API_URL = process.env.REACT_APP_API_URL;

let StoreData = [];
try {
  console.log("API_URL", API_URL+"/api/products/");
  const response = await axios.get(API_URL+"/products/");
  console.log("Products", response.data);
  for (let i = 0; i < response.data.length; i++) {
    StoreData.push({
      productID: response.data[i].id,
      frontImg: response.data[i].image,
      productName: response.data[i].name,
      productPrice: response.data[i].price,
      productReviews: "9k+ reviews",
      productStock: response.data[i].stock,
      productDescription: response.data[i].description,
      Category: response.data[i].category,
      Franchise: response.data[i].franchise,
      productAvailable: response.data[i].is_available,
    });
  }
} catch (error) {
  console.error("Failed:", error.response ? error.response.data : error.message);
}
console.log("StoreData", StoreData);

export default StoreData;
