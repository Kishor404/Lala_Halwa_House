import React from "react";
import "./CollectionBox.css";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="collection">
        <div className="collectionLeft">
          <p className="col-p">Divine</p>
          <h3 className="col-h3">
            <span>Halwa</span> Collection
          </h3>
          <div className="col-link">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p">Delicious</p>
            <h3 className="col-h3">
              <span>Sweet</span> Collection
            </h3>
            <div className="col-link">
              <Link to="/shop" onClick={scrollToTop}>
                <h5>Shop Now</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p">Hot</p>
              <h3 className="col-h3">
                <span>Spicy</span> Collection
              </h3>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <p className="col-p">Nutrient</p>
              <h3 className="col-h3">
                <span>Healty</span> Snacks
              </h3>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionBox;
