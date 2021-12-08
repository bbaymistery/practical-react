import React from "react";
import { Link } from "react-router-dom";
const ProductHeader = ({ singleProduct, loadingSingleProduct }) => {
  return (
    <div>
      <div className="header" style={{ paddingTop: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/products"> /Products </Link>
        {!loadingSingleProduct && (
          <a className="lastLink"> /{singleProduct.name}</a>
        )}
      </div>
      <div style={{ paddingTop: "16px" }} className="section-center">
        <Link className="btn" to="/">
          Back To Product
        </Link>
      </div>
    </div>
  );
};

export default ProductHeader;
