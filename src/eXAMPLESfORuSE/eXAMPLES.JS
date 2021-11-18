import React from "react";
const useStyles = makeStyles((theme) => ({
  button: {
    color: "black",
    backgroundColor: "yellow",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#ebe705",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".7rem",
    },
  },
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));
const eXAMPLES = () => {
  return (
    <div>
      <h1>salam</h1>
    </div>
  );
};

export default eXAMPLES;

//deleting

//for canceling axios
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

//getting datas
useEffect(() => {
  const geLists = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    // console.log(data);
    if (data) {
      let newDatas = data.map((d) => {
        const {
          id,
          name,
          symbol,
          image,
          current_price,
          price_change_percentage_24h,
          market_cap,
        } = d;

        return {
          id,
          name,
          symbol,
          image,
          current_price,
          price_change_percentage_24h,
          market_cap,
        };
      });

      setDatas(newDatas);
      // setTimeout(() => {
      setLoading(false);
      // }, 1000);
    }
  };

  geLists();
  //aos animation

  return () => {
    source.cancel();
  };
}, [page, currency]);
