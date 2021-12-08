import React from "react";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
import Product from "../Product/Product";

const GridView = () => {
  //ikidene bazada tuturug ege r guery varsa sorted olanlar gorsenir yoxdusa normal olanlar
  const { sortedProducts } = useFilterGlobalContext();
  // console.log(sortedProducts);

  return (
    <div className="right_down grid_view">
      {sortedProducts.map((product) => {
        // console.log(product);

        return <Product key={product.id} {...product} />;
      })}
    </div>
  );
};

export default GridView;
