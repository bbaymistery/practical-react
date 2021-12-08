import React from "react";
//scc
import "./header.scss";

//images and links
import Logo from "../../assets/logo.svg";
import { links } from "../../utils/constants";
//icons from react icons

import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

//contexts
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useCartGlobalContext } from "../../contexts/CardContext";

const Header = () => {
  const { openCloseSideBarMenu } = useProductsGlobalContext();
  const { amount } = useCartGlobalContext();
  // console.log(amount);

  return (
    <div className="section-center">
      <div className="header">
        <div className="header_logo">
          <Link to="/">
            <img src={Logo} alt="Image" />
          </Link>
        </div>

        <div className="header_list">
          <ul className="list">
            {links.map((link) => {
              return (
                <Link to={`${link.url}`} key={link.id}>
                  {link.text}
                </Link>
              );
            })}
          </ul>
        </div>

        <div className="header_icons">
          <div className="shopcart_container">
            <Link to="/cart">Cart</Link>
            <FaShoppingCart className="icon" />
            <span className="value">{amount}</span>
          </div>
          <div href="" className="user_container">
            Login
            <FiUserPlus className="icon" />
          </div>
        </div>

        <div
          className="header_hamburger hide-for-desktop"
          onClick={() => openCloseSideBarMenu("open")}
        >
          <GiHamburgerMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
