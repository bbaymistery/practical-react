//importing react stuffs
import React, { useState, useContext, useEffect, useReducer } from "react";
import faker from "faker";
//import reducer
import cartReducer from "./reducer";
import { productReducer } from "./reducer";
//import custom hooks

const AppContext = React.createContext();
faker.seed(99);
const AppProvider = ({ children }) => {
  //fake olarak prudcts uretdik
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  return (
    <AppContext.Provider
      value={{ state, dispatch, productDispatch, productState }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
