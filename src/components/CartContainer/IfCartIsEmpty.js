import React from "react";
import { Link } from "react-router-dom";

const IfCartIsEmpty = () => {
  return (
    <div
      style={{
        // backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
    >
      <h1>Your cart is empty</h1>
      <button className="btn" style={{ marginTop: "2rem" }}>
        <Link to="/products">Fill it</Link>
      </button>
    </div>
  );
};

export default IfCartIsEmpty;
