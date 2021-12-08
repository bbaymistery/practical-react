import React, { useState, useContext, useEffect, useReducer } from "react";

import filterReducer from "../reducers/filterReducer";
import {
  FILTER_PRODUCTS,
  UPDATE_FILTERS,
  GET_ALL_PRODUCTS_TOBE_FILTERED,
  SORT_PRODUCTS_BY,
  UPDATE_SORT_VALUE,
  SET_LOADING,
  CLEAR_FILTER,
} from "../actions/index";
import axios from "axios";
import { products_url } from "../utils/constants";

const FilterContext = React.createContext();

const initialState = {
  allProducts: [],
  sortedProducts: [],
  sort: "price-lowest",
  loading: true,
  clearedField: false, //bunu men ozum yazdm ama genelde bu yazmlamamlidir
  filter: {
    minPrice: 0,
    maxPrice: 0,
    color: "all",
    category: "all",
    company: "all",
    freeShipping: false,
    searchQuery: "",
  },
};

const FilterContextProvider = ({ children }) => {
  const [state, filterDispatch] = useReducer(filterReducer, initialState);
  useEffect(() => {
    filterDispatch({ type: FILTER_PRODUCTS });
    filterDispatch({ type: SORT_PRODUCTS_BY });
  }, [state.filter, state.sort]);

  //bringing all products and featured ones
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(products_url);
      filterDispatch({ type: SET_LOADING });
      filterDispatch({
        type: GET_ALL_PRODUCTS_TOBE_FILTERED,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const updateSortValue = (e) => {
    filterDispatch({ type: UPDATE_SORT_VALUE, payload: e.target.value });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value =
      e.target.getAttribute("data-color") ||
      e.target.value ||
      e.target.innerText.toLowerCase();
    if (name === "price") {
      value = Number(value);
      console.log(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    filterDispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFields = (e) => {
    filterDispatch({ type: CLEAR_FILTER });
  };
  return (
    //all values go to productList... component
    <FilterContext.Provider
      value={{
        ...state,
        updateSortValue,
        handleChange,
        clearFields,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterGlobalContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, FilterContextProvider };
