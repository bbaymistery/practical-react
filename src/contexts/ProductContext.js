import React, { useState, useContext, useEffect, useReducer } from "react";
import { products_url, single_product_url } from "../utils/constants";
import axios from "axios";
import productReducer from "../reducers/productReducer";
import {
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  IS_SIDEBAR_OPEN,
  SET_LOADING,
  SET_SINGLE_PRODUCT_LOADING,
} from "../actions";
const ProductContext = React.createContext();

const initialState = {
  isSideBarOpen: false,
  rooms: [],
  featuredRooms: [],
  loading: true,
  singleProduct: [],
  loadingSingleProduct: true,
};

const ProductProvider = ({ children }) => {
  const [state, productDispatch] = useReducer(productReducer, initialState);
  const [error, setError] = useState(false);
  //set ope or close side bar
  const openCloseSideBarMenu = (value) => {
    productDispatch({ type: IS_SIDEBAR_OPEN, payload: value });
  };

  //bringing all products and featured ones
  const fetchAllRooms = async () => {
    try {
      productDispatch({ type: SET_LOADING });
      const response = await axios.get(products_url);
      // console.log(response);

      productDispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllRooms();
  }, []);

  ///setting single product
  const fetchSingleProduct = async (id) => {
    try {
      productDispatch({ type: SET_SINGLE_PRODUCT_LOADING });
      const response = await axios.get(`${single_product_url}${id}`);
      // console.log(response);
      productDispatch({ type: GET_SINGLE_PRODUCT, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
        error,
        openCloseSideBarMenu,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
// make sure use
export const useProductsGlobalContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider };
// //
// category:'all',
// company:'all',
// colors:'all',
// minPrice:0,
// maxPrice:0,
// freeShipping:false,
// sortedByPrice:'lowest',
