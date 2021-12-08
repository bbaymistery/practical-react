import React, { useEffect, useRef, useState } from "react";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
import { formatPrice, getUniqueValues } from "../../utils/helpers";
import Loading from "../Loading";
const ProductListLeftSide = () => {
  const {
    loading,
    allProducts,
    handleChange,
    clearFields,

    filter: { searchQuery, maxPrice, minPrice, maxPriceForRange, price },
  } = useFilterGlobalContext();

  let categories = getUniqueValues(allProducts, "category");
  let colors = getUniqueValues(allProducts, "colors");
  let companies = getUniqueValues(allProducts, "company");

  const changeActiveClass = (e) => {
    let childrenOfTarget = e.currentTarget.parentElement.children;
    //cateori cin
    for (let i = 0; i < childrenOfTarget.length; i++) {
      childrenOfTarget[i].classList.remove("active");
      e.currentTarget.classList.add("active");
    }
    //colors icin
    if (childrenOfTarget[1]) {
      let mainBox = childrenOfTarget[1].children;
      //color boxa tiklayinca calismamasi icin sart yaziyoruz
      if (
        e.target.classList.contains("color") ||
        e.target.classList.contains("all")
      ) {
        for (let i = 0; i < mainBox.length; i++) {
          mainBox[i].classList.remove("active");
          if (mainBox[i].firstChild) {
            mainBox[i].firstChild.remove();
            mainBox[0].innerText = "All";
          }
          e.target.classList.add("active");
          // e.currentTarget.classList.add("active");
        }
        if (e.target.classList.contains("all")) {
          e.target.innerText = "All";
        } else {
          e.target.innerText = "✔️";
        }
      }
      handleChange(e);
    }
  };

  if (clearFields === true) {
    window.location.reload();
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="left">
      <div>
        {/* burda her degisende e.target.name=searchGuery
         e.target.value ='ne yazaqrasm o
        */}

        <input
          type="text"
          placeholder="search product"
          value={searchQuery}
          onChange={(e) => handleChange(e)}
          name="searchQuery"
        />
      </div>
      <div className="categories">
        <h5 className="categories_header">Category</h5>
        <div
          className="categories_list"
          style={{ textTransform: "capitalize" }}
        >
          {categories &&
            categories.map((category, index) => {
              return (
                <button
                  key={category}
                  className={index === 0 ? "active" : ""}
                  name="category"
                  onClick={(e) => changeActiveClass(e)}
                >
                  {category}
                </button>
              );
            })}
        </div>
      </div>
      <div className="companies">
        <h5>Company</h5>
        <select name="company" onChange={(e) => handleChange(e)}>
          {companies &&
            companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
        </select>
      </div>
      <div className="colors">
        <h5>Colors</h5>
        <div
          className="color-box"
          // onChange={(e) => handleChange(e)}
          onClick={changeActiveClass}
        >
          {/* <button className="all active">All</button> */}
          {colors?.map((color, index) => {
            return (
              <button
                key={index}
                onClick={(e) => handleChange(e)}
                className={`${color === "all" ? " all active" : "color"}`}
                style={{
                  backgroundColor: `${color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                data-color={color}
                name="color"
              >
                {color === "all" ? "All" : ""}
              </button>
            );
          })}
        </div>
      </div>
      {/* <div className="price">
        <h5>Price</h5>
        <p> {maxPrice}</p>
        <input
          type="range"
          name="price"
          id="price"
          min={0}
          max={maxPriceForRange}
          value={price}
          onChange={handleChange}
          className="form-control"
        />
      </div> */}
      <div className="shipping">
        <label>Shipping Free</label>
        <input
          type="checkbox"
          id="shipping"
          name="shipping"
          value="Boat"
          onChange={handleChange}
        ></input>
      </div>
      {/* <div className="clearFilter">
        <button onClick={(e) => clearFields(e)}>Clear Filters</button>
      </div> */}
    </div>
  );
};

export default ProductListLeftSide;
{
  /* <button className="all active">All</button>
          <button className="color" style={{ backgroundColor: "red" }}></button>
          <button className="color"></button>
          <button className="color"></button>
          <button className="color"> </button>
          <button className="color"></button> */
}
