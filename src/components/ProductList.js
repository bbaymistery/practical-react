import { ListSharp } from "@material-ui/icons";
import React from "react";
import { useGlobalContext } from "../context/context";
import Product from "./Product";
const ProductList = () => {
  const { list, clearAllItems } = useGlobalContext();
  return (
    <>
      <div className="list">
        {list.map((list) => (
          <Product list={list} key={list.id} />
        ))}
      </div>
      <button className="btn" onClick={() => clearAllItems()}>
        Clear All Items
      </button>
    </>
  );
};

export default ProductList;
