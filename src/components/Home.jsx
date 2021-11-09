import React from "react";

import "../components/styles.css";
import { useGlobalContext } from "../context/context";

//komponents
import Filter from "./Filter";
import SingleProduct from "./SigleProduct";
const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = useGlobalContext();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <div className="home">
      <Filter />
      {/* <div className="productContainer">
        {products.map((pro) => {
          return <SingleProduct prd={pro} key={pro.id} />;
        })}
      </div> */}

      <div className="productContainer">
        {transformProducts().map((pro) => (
          <SingleProduct prd={pro} key={pro.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
