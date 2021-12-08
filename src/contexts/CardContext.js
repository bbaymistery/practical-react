import React, { useState, useContext, useEffect, useReducer } from "react";
import {
  ADD_PRODUCT_TO_CART,
  CLEAR_SHOPPING,
  COUNT_CART_TOTALS,
  DELETE_PRODUCT_FROM_CART,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

import cartReducer from "../reducers/cartReducer";

const CardContext = React.createContext();

let localStorageCartItems = [];
if (localStorage.getItem("cartItems")) {
  localStorageCartItems = JSON.parse(localStorage.getItem("cartItems"));
}
const initialState = {
  addedCartItems: localStorageCartItems,
  toralPrice: 0,
  shippingFee: 534,
  amount: 0,
};

const CardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cartItems", JSON.stringify(state.addedCartItems));
  }, [state.addedCartItems]);

  const addProduct = (pr, amount, color) => {
    //i passed amount and color within the product and i will destruct them in the CartTable
    //id coloru yazdkki reducer ile tekrar eyni itemi eklemeyin garsisini alag
    let newValue = {
      ...pr,
      amount,
      color,
      idColor: pr.id + color,
      maxAmount: pr.stock,
    };
    dispatch({ type: ADD_PRODUCT_TO_CART, payload: newValue });
  };

  const deleteCartItem = (id, index, color) => {
    let idIndex = { id, index, idColor: id + color };
    console.log(idIndex); //sadeceidColoru kullandik

    dispatch({ type: DELETE_PRODUCT_FROM_CART, payload: idIndex });
  };

  const clearShooping = () => {
    dispatch({ type: CLEAR_SHOPPING });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };

  return (
    <CardContext.Provider
      value={{
        ...state,
        addProduct,
        deleteCartItem,
        clearShooping,
        toggleAmount,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
// make sure use
export const useCartGlobalContext = () => {
  return useContext(CardContext);
};

export { CardContext, CardContextProvider };
