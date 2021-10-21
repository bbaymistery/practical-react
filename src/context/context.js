import React, { useState, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/reducer";
const AppContext = React.createContext();

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
const initialState = {
  total: 0,
  isEditing: false,
  list: initialExpenses,
  editingValue: "",
  editingAmount: "",
  editItemId: "",
  alert: {
    show: false,
    msg: "",
    type: "",
  },
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //setItemsToLacle storage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.list));
    dispatch({ type: "CALC_TOTAL" });
  }, [state.list]);

  const handleSubmit = (inpValues) => {
    if (!state.isEditing) {
      dispatch({ type: "ADD_PRODUCT", payload: inpValues });
    } else {
      dispatch({ type: "UPDATING_EDIT_VALUE", payload: inpValues });
    }
  };

  const removeAlert = () => {
    dispatch({ type: "REMOVE_ALERT" });
  };

  const clearAllItems = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const alertMessageForEmpty = () => {
    dispatch({ type: "ALERT_FOR_EMPTY_BOX" });
  };

  const makeItemToShowOnInput = (id) => {
    let findItem = state.list.find((list) => list.id === id);
    dispatch({ type: "SHOW_EDIT_ITEMS", payload: findItem });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleSubmit,
        alertMessageForEmpty,
        removeAlert,
        clearAllItems,
        removeItem,
        makeItemToShowOnInput,
      }}
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
