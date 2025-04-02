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

let StoreData = [];
try {
  const response = await axios.get("http://127.0.0.1:8000/products/");
  console.log("Products", response.data);
  for (let i = 0; i < response.data.length; i++) {
    StoreData.push({
      productID: response.data[i].id,
      frontImg: response.data[i].image,
      productName: response.data[i].name,
      productPrice: response.data[i].price,
      productReviews: "9k+ reviews",
    });
  }
} catch (error) {
  console.error("Failed:", error.response ? error.response.data : error.message);
}
console.log("StoreData", StoreData);

export default StoreData;
