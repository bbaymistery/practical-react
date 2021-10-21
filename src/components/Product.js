import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

const Product = ({ list }) => {
  const { removeItem, makeItemToShowOnInput } = useGlobalContext();
  return (
    <div>
      <p className="name">{list.value}</p>
      <span className="fiyat">{list.amount} $</span>
      <p className="icons">
        <FaTrash
          style={{ marginRight: "4PX" }}
          onClick={() => removeItem(list.id)}
        />
        <FaEdit onClick={() => makeItemToShowOnInput(list.id)} />
      </p>
    </div>
  );
};

export default Product;
