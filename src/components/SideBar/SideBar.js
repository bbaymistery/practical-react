import React from "react";
import "./sidebar.scss";
import { AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { useCartGlobalContext } from "../../contexts/CardContext";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { isSideBarOpen, openCloseSideBarMenu } = useProductsGlobalContext();
  const { amount } = useCartGlobalContext();
  return (
    <div className={isSideBarOpen ? "sidebar open" : "sidebar"}>
      <div className="sidebar_nav">
        <div className="logo">
          <Link to="/" onClick={() => openCloseSideBarMenu("close")}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="closebtn" onClick={() => openCloseSideBarMenu("close")}>
          <AiOutlineClose className="icon" />
        </div>
      </div>

      <div className="sidebar_list">
        <ul className="list">
          <li>
            <Link to="/" onClick={() => openCloseSideBarMenu("close")}>
              Home
            </Link>
          </li>
          {/* <li>
            <Link to="/about" onClick={() => openCloseSideBarMenu("close")}>
              About
            </Link>
          </li> */}
          <li>
            <Link to="/products" onClick={() => openCloseSideBarMenu("close")}>
              Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar_icons">
        <div className="shopcart_container">
          <Link to="/cart" onClick={() => openCloseSideBarMenu("close")}>
            Cart
          </Link>
          <FaShoppingCart className="icon" />
          <span className="value">{amount}</span>
        </div>
        <div href="" className="user_container">
          Login
          <FiUserPlus className="icon" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
