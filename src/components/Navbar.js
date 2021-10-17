import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import React, { Component } from "react";
import { ButtonContainer } from "./styledComponents/Button";

export default class Navbar extends Component {
  render() {
    return (
      <Nav className="navbar navbar-expand-sm justify-center navbar-dark px-sm-5">
        {/* https://www.iconfinder.com/icons/1243689/call_phone_icon Creative
      Commons (Attribution 3.0 Unported); https://www.iconfinder.com/Makoto_msk */}
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-tems-center">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {" "}
              Products
            </Link>
          </li>
        </ul>

        <Link to="/cart" className="ms-auto">
          <ButtonContainer>
            <span className="me-2">
              {" "}
              <i className="fas fa-cart-plus"></i>
            </span>
            My Cart
          </ButtonContainer>
        </Link>
      </Nav>
    );
  }
}
const Nav = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;
