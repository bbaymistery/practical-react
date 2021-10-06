import React, { useState, useContext, useEffect } from "react";

import useFetch from "./useFetch";
const AppContext = React.createContext();

export const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US&query=batman&page=1`;
const getValueFromLs = () => {
  let value = "batman";
  if (localStorage.getItem("searchValue")) {
    value = localStorage.getItem("searchValue");
  }
  return value;
};

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(getValueFromLs());
  const { loading, error, data: movies } = useFetch(query);

  useEffect(() => {
    localStorage.setItem("searchValue", query);
  }, [query]);
  return (
    <AppContext.Provider value={{ movies, loading, setQuery, error, query }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
