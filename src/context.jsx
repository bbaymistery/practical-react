import React, { useState, useContext, useEffect } from "react";
// import useFetch from "../hooks/useFetch";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const query = "";
  // const { loading, error, data: movies } = useFetch(query);

  return <AppContext.Provider value="value">{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
