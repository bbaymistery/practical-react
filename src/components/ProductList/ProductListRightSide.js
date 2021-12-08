import React, { useState } from "react";
import { AiFillAppstore, AiOutlineAlignCenter } from "react-icons/ai";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductListRightSide = () => {
  const [gridView, setGridView] = useState(true);
  const changeActiveClass = (e) => {
    let childrenOfTarget = e.currentTarget.parentElement.children;
    for (let i = 0; i < childrenOfTarget.length; i++) {
      childrenOfTarget[i].classList.remove("active");
      e.currentTarget.classList.add("active");

      setGridView(!gridView);
    }
    // }
  };
  const { sortedProducts, updateSortValue } = useFilterGlobalContext();
  return (
    <div className="right">
      <div className="right_up">
        <div className="btn_container">
          <button className="grid_view-btn active" onClick={changeActiveClass}>
            <AiFillAppstore className="icon" style={{ color: "gray" }} />
          </button>
          <button className="list_view-btn" onClick={changeActiveClass}>
            <AiOutlineAlignCenter className="icon" style={{ color: "gray" }} />
          </button>
        </div>

        <span>{sortedProducts.length} Products Found </span>

        <form>
          <label htmlFor="sort">sort by</label>
          <select
            name="sort"
            id="sort"
            className="sort-input"
            onChange={(e) => updateSortValue(e)}
          >
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a - z)</option>
            <option value="name-z">name (z - a)</option>
          </select>
        </form>
      </div>
      <hr style={{ marginTop: "1rem" }} />
      {gridView ? <GridView /> : <ListView />}
    </div>
  );
};

export default ProductListRightSide;
