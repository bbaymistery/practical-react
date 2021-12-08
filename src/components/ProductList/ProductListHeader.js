import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ProductListHeader = () => {
  return (
    <Header>
      <div className="section-center">
        <div className="card_header" style={{ paddingTop: "10px" }}>
          <Link to="/">Home</Link>
          <Link to=""> /Products </Link>
        </div>
      </div>
    </Header>
  );
};
const Header = styled.div`
  background: var(--clr-primary-10);
  .card_header {
    min-height: 12vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--clr-primary-1);
    letter-spacing: 0.2rem;
    a:last-child {
      color: var(--clr-primary-1);
      letter-spacing: 0.22rem;
    }
    a {
      font-size: 1.5rem;
      color: var(--clr-primary-3);
      padding: 0.5rem;
      font-weight: bold;
      transition: var(--transition);
      &:not(:last-child):hover {
        color: var(--clr-primary-1);
        letter-spacing: 0.22rem;
      }
    }
  }
`;
export default ProductListHeader;
