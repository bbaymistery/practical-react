import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { numberWithCommas } from "./comps/numberWithCommas";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  const [watchListDatas, setWatchListDatas] = useState([]);
  const [watchIDs, setWatchIDs] = useState([]);
  //bura atdgki  sidebarada godnere bilek
  const [coin, setCoin] = useState();
  const [alert, setAlert] = useState({
    msg: "",
    open: false,
  });
  console.log(alert.open);
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "RUB") {
      setSymbol("₽");
    }
  }, [currency]);

  const removeItemFromWatchList = (value) => {
    if (value) {
      setWatchListDatas(watchListDatas.filter((d) => d.id !== value.id));
      setWatchIDs(watchIDs.filter((d) => d !== value.id));
      setAlert({
        ...alert,
        msg: `${value.name}Deleted Succesfully`,
        open: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, msg: "", open: false });
      }, 1500);
    }
  };
  //add ve remove seklinde ayaralamalar
  const addItemToWatchList = (item) => {
    if (item) {
      setWatchListDatas([...watchListDatas, item]);
      setWatchIDs([...watchIDs, item.id]);
      setAlert({
        ...alert,
        msg: `${item.name} Added Succesfully`,
        open: true,
      });
      setTimeout(() => {
        setAlert({ ...alert, msg: "", open: false });
      }, 1500);
    }
  };

  return (
    <AppContext.Provider
      value={{
        alert,
        setAlert,
        watchIDs,
        setWatchIDs,
        coin,
        setCoin,
        currency,
        setCurrency,
        symbol,
        watchListDatas,
        setWatchListDatas,
        watchListDatas,
        removeItemFromWatchList,
        addItemToWatchList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
