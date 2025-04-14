import React, { useState } from "react";
import "./ShoppingCart.css";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../Features/Cart/cartSlice";

import { MdOutlineClose } from "react-icons/md";

import { Link } from "react-router-dom";

import success from "../../Assets/success.png";

import cartData from "../../Data/CartData";

import toast from "react-hot-toast";
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);

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

  //========================= REMOVE FROM CART ====================================================

  const handleRemoveFromCart = async(product) => {
    console.log(product)
    const data={"product":product.product, "quantity":1};
    const cart = Cookies.get('cart');
    const aToken = await refreshAccessToken();
    try {
      const response = await axios.post(API_URL+'/cart/'+cart+'/remove_item/', data, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      console.log('Remove From Cart Success:', response.data);
      toast.success(`Removed From cart!`, {
        duration: 2000,
        style: {backgroundColor: "#07bc0c",color: "white",},
        iconTheme: {primary: "#fff",secondary: "#07bc0c",},
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Remove From Cart Failed:', error.response?.data || error.message);
      toast.error("Error Occur! Try Again After Sometime", {
        duration: 2000,
        style: {backgroundColor: "#ff4b4b",color: "white",},
        iconTheme: {primary: "#fff",secondary: "#ff4b4b",},
      });
    }
  };

  //========================= REMOVE PRODUCT FROM CART ====================================================

  const handleRemoveProductFromCart = async(product) => {
    console.log(product)
    const data={"product":product.product, "quantity":0};
    const cart = Cookies.get('cart');
    const aToken = await refreshAccessToken();
    try {
      const response = await axios.post(API_URL+'/cart/'+cart+'/remove_item/', data, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      console.log('Remove From Cart Success:', response.data);
      toast.success(`Removed From cart!`, {
        duration: 2000,
        style: {backgroundColor: "#07bc0c",color: "white",},
        iconTheme: {primary: "#fff",secondary: "#07bc0c",},
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Remove From Cart Failed:', error.response?.data || error.message);
      toast.error("Error Occur! Try Again After Sometime", {
        duration: 2000,
        style: {backgroundColor: "#ff4b4b",color: "white",},
        iconTheme: {primary: "#fff",secondary: "#ff4b4b",},
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

    //========================= ADD TO CART ====================================================
  
    const handleAddToCart = async(product) => {
  
      const data={"product":product.product, "quantity":1};
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
  
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

    //============================== CALC QUANTITY ====================================

    const calcQuantity = (iQuantity) => {
      const iQ= iQuantity * 50;
      if (iQ < 1000) {
        return iQ + " g";
      } else {
        return (iQ / 1000) + " kg";
      }
    };

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartData[0].items.length > 0) {
      setActiveTab(tab);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // current Date

  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number

  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data

  const [selectedPayment, setSelectedPayment] = useState(
    "Direct Bank Transfer"
  );

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <div>
      <div className="shoppingCartSection">
        <h2>Cart</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Shopping Bag</h3>
                  <p>Manage Your Items List</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartData[0].items.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Shipping and Checkout</h3>
                  <p>Checkout Your Items List</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartData[0].items.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Confirmation</h3>
                  <p>Review And Submit Your Order</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  {/* For Desktop Devices */}
                  <table className="shoppingBagTable">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Detail</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData[0].items.length > 0 ? (
                        cartData[0].items.map((item) => (
                          <tr key={item.productID}>
                            <td data-label="Product">
                              <div className="shoppingBagTableImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                            </td>
                            <td data-label="">
                              <div className="shoppingBagTableProductDetail">
                                <Link to="/product" onClick={scrollToTop}>
                                  <h4>{item.productName}</h4>
                                </Link>
                                <p>{item.franchise}</p>
                              </div>
                            </td>
                            <td
                              data-label="Price"
                              style={{ textAlign: "start" }}
                            >
                              ₹{item.price}
                            </td>
                            <td data-label="Quantity">
                              <div className="ShoppingBagTableQuantity">
                                <button
                                  onClick={() =>
                                    handleRemoveFromCart(item)
                                  }
                                >
                                  -
                                </button>
                                <p>{calcQuantity(item.quantity)}</p>
                                <button
                                  onClick={() =>
                                    handleAddToCart(item)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              <p
                                style={{
                                  textAlign: "left",
                                  paddingLeft:"20px",
                                  fontWeight: "500",
                                }}
                              >
                                ₹{item.total_price}
                              </p>
                            </td>
                            <td data-label="">
                              <MdOutlineClose
                                onClick={() =>
                                  handleRemoveProductFromCart(item)
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="shoppingCartEmpty">
                              <span>Your cart is empty!</span>
                              <Link to="/shop" onClick={scrollToTop}>
                                <button>Shop Now</button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <th
                        colSpan="6"
                        className="shopCartFooter"
                        style={{
                          borderBottom: "none",
                          padding: "20px 0px",
                        }}
                      >
                        {cartData[0].items.length > 0 && (
                          <div className="shopCartFooterContainer">
                            <form>
                              <input
                                type="text"
                                placeholder="Coupon Code"
                              ></input>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Apply Coupon
                              </button>
                            </form>
                            <button
                              onClick={() => {
                                window.location.reload();
                              }}
                              className="shopCartFooterbutton"
                            >
                              Refresh Cart
                            </button>
                          </div>
                        )}
                      </th>
                    </tfoot>
                  </table>

                  {/* For Mobile devices */}

                  <div className="shoppingBagTableMobile">
                    {cartData[0].items.length > 0 ? (
                      <>
                        {cartData[0].items.map((item) => (
                          <div key={item.productID}>
                            <div className="shoppingBagTableMobileItems">
                              <div className="shoppingBagTableMobileItemsImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                              <div className="shoppingBagTableMobileItemsDetail">
                                <div className="shoppingBagTableMobileItemsDetailMain">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews}</p>
                                  <div className="shoppingBagTableMobileQuantity">
                                    <button
                                      onClick={() => handleRemoveFromCart(item)
                                      }
                                    >
                                      -
                                    </button>
                                    <p>{calcQuantity(item.quantity)}</p>
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item)
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span>₹{item.price}</span>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetailTotal">
                                  <MdOutlineClose
                                    size={20}
                                    onClick={() => handleRemoveProductFromCart(item)
                                    }
                                  />
                                  <p>₹{item.total_price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="shopCartFooter">
                          <div className="shopCartFooterContainer">
                            <form>
                              <input
                                type="text"
                                placeholder="Coupon Code"
                              ></input>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Apply Coupon
                              </button>
                            </form>
                            <button
                              onClick={() => {
                                window.location.reload();
                              }}
                              className="shopCartFooterbutton"
                            >
                              Refresh Cart
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Your cart is empty!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Shop Now</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>Cart Totals</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>₹{cartData[0].total_price.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>
                          <div className="shoppingBagTotalTableCheck">
                            <p>₹{(cartData[0].total_price === 0 ? 0 : 100).toFixed(2)}</p>
                            <p>Shipping to Al..</p>
                            <p
                              onClick={scrollToTop}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              CHANGE ADDRESS
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>VAT</th>
                        <td>₹{(cartData[0].total_price === 0 ? 0 : cartData[0].total_price*13/100).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>
                          ₹{(cartData[0].total_price === 0 ? 0 : cartData[0].total_price+(cartData[0].total_price*13/100)+100).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab2");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={cartData[0].items.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <div className="checkoutSection">
                <div className="checkoutDetailsSection">
                  <h4>Billing Details</h4>
                  <div className="checkoutDetailsForm">
                    <form>
                      <div className="checkoutDetailsFormRow">
                        <input type="text" placeholder="Name" />
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                      />
                      <input type="text"
                        placeholder="Country"
                      />
                      <select name="country" id="country">
                        <option value="Country / Region" selected disabled>
                          Country / Region
                        </option>
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Turkey">Turkey</option>
                      </select>
                      <input type="text" placeholder="Street Address*" />
                      <input type="text" placeholder="" />
                      <input type="text" placeholder="Town / City *" />
                      <input type="text" placeholder="Postcode / ZIP *" />
                      <input type="text" placeholder="Phone *" />
                      <input type="mail" placeholder="Your Mail *" />
                      <div className="checkoutDetailsFormCheck">
                        <label>
                          <input type="checkbox" />
                          <p>Create An Account?</p>
                        </label>
                        <label>
                          <input type="checkbox" />
                          <p>Ship to a different Address</p>
                        </label>
                      </div>
                      <textarea
                        cols={30}
                        rows={8}
                        placeholder="Order Notes (Optional)"
                      />
                    </form>
                  </div>
                </div>
                <div className="checkoutPaymentSection">
                  <div className="checkoutTotalContainer">
                    <h3>Your Order</h3>
                    <div className="checkoutItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartData[0].items.map((items) => (
                            <tr>
                              <td>
                                {items.product_name} x {items.quantity}
                              </td>
                              <td>₹{items.total_price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="checkoutTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{cartData[0].total_price.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹100</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>₹{cartData[0].total_price*13/100}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              ₹
                              {(cartData[0].total_price === 0 ? 0 : cartData[0].total_price + (cartData[0].total_price*13/100) + 100).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="checkoutPaymentContainer">
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Direct Bank Transfer"
                        defaultChecked
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Direct Bank Transfer</span>
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.Your
                          order will not be shipped until the funds have cleared
                          in our account.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Check Payments"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Check Payments</span>
                        <p>
                          Phasellus sed volutpat orci. Fusce eget lore mauris
                          vehicula elementum gravida nec dui. Aenean aliquam
                          varius ipsum, non ultricies tellus sodales eu. Donec
                          dignissim viverra nunc, ut aliquet magna posuere eget.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Cash on delivery"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Cash on delivery</span>
                        <p>
                          Phasellus sed volutpat orci. Fusce eget lore mauris
                          vehicula elementum gravida nec dui. Aenean aliquam
                          varius ipsum, non ultricies tellus sodales eu. Donec
                          dignissim viverra nunc, ut aliquet magna posuere eget.
                        </p>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Paypal"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Paypal</span>
                        <p>
                          Phasellus sed volutpat orci. Fusce eget lore mauris
                          vehicula elementum gravida nec dui. Aenean aliquam
                          varius ipsum, non ultricies tellus sodales eu. Donec
                          dignissim viverra nunc, ut aliquet magna posuere eget.
                        </p>
                      </div>
                    </label>
                    <div className="policyText">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <Link to="/terms" onClick={scrollToTop}>
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab3");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setPayments(true);
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h3>Your order is completed!</h3>
                    <p>Thank you. Your order has been received.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Order Number</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Date</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Total</p>
                      <h4>₹{(cartData[0].total_price === 0 ? 0 : cartData[0].total_price + (cartData[0].total_price*13/100) + 100).toFixed(2)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Payment Method</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Order Details</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartData[0].items.map((items) => (
                            <tr>
                              <td>
                                {items.product_name} x {items.quantity}
                              </td>
                              <td>₹{items.total_price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{cartData[0].total_price.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹100</td>
                          </tr>
                          <tr>
                            <th>VAT</th>
                            <td>₹{(cartData[0].total_price*13/100).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              ₹
                              {(cartData[0].total_price === 0 ? 0 : cartData[0].total_price + (cartData[0].total_price*13/100) + 100).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
