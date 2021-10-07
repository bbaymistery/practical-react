import React, { useState, useContext, useEffect, useReducer } from "react";
import {
  SET_LOADING, //api
  SET_STORIES, //useState olur icine apiden geleni atiriq
  REMOVE_STORY, //remove butonu
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "../reducer/actions";
import reducer from "../reducer/reducer";

const AppContext = React.createContext();
const initialState = {
  loading: true,
  stories: [],
  page: 0,
  nbPages: 0,
  valueOfInput: "react",
};
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //first we need fetch the news from api
  const fetchNews = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: SET_STORIES, payload: data });
    } catch (error) {
      dispatch({ type: "ERRORR", payload: error });
    }
  };

  //click to the button to change pages number
  const handlePage = (decreaseOrIncrease) => {
    dispatch({ type: HANDLE_PAGE, payload: decreaseOrIncrease });
  };

  //searching value of input
  const handleSearch = (valueOfInput) => {
    dispatch({ type: HANDLE_SEARCH, payload: valueOfInput });
  };

  const handleRemove = (id) => {
    console.log(id);
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  //whent page and inp value changes
  useEffect(() => {
    fetchNews(`${API_ENDPOINT}query=${state.valueOfInput}&page=${state.page}`);
  }, [state.valueOfInput, state.page]);
  return (
    <AppContext.Provider
      value={{ ...state, handlePage, handleSearch, handleRemove }}
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

/*

// const getValueFromLs = () => {
//   let value = "batman";
//   if (localStorage.getItem("searchValue")) {
//     value = localStorage.getItem("searchValue");
//   }
//   return value;
// };


  // useEffect(() => {
  //   localStorage.setItem("searchValue", query);
  // }, [query]);
*/
