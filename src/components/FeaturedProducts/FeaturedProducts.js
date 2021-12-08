import React from "react";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import styled from "styled-components";
import Loading from "../Loading";
import Product from "../Product/Product";
import { Outlet, Link, NavLink } from "react-router-dom";

const FeaturedProducts = () => {
  const { loading, featuredRooms, error } = useProductsGlobalContext();

  if (loading && error) {
    return (
      <h4
        style={{
          textAlign: "center",
        }}
      >
        Too many requests, please try again later
      </h4>
    );
  }
  if (loading && !error) {
    return <Loading />;
  }
  return (
    <Wrapper
      className="section"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featuredRooms?.slice(0, 3).map((product) => {
          // console.log(product);

          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 3.5rem;
    grid-template-columns: 1fr 1fr 1fr;
    img {
      height: 225px;
    }
  }
  /* .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  } */
  @media (max-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
