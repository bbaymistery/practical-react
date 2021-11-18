import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { CoinListApi } from "../../config/api";
import axios from "axios";

//comps
// import Pagination from "../Pagination";
import TableList from "../TableList";
import Pagination from "../Pagination";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#a7e08f",
    },
    type: "dark",
  },
});
const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: "1rem 0rem",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.8rem",
    },
  },
}));
const CoinList = () => {
  const classess = useStyles();
  const { currency, symbol } = useGlobalContext();
  const [searchValue, setSearchValue] = useState();
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = () => {
    if (searchValue) {
      return datas.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchValue) ||
          coin.symbol.toLowerCase().includes(searchValue) ||
          coin.symbol.toUpperCase().includes(searchValue) ||
          coin.name.toUpperCase().includes(searchValue)
      );
    } else {
      return datas;
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container className={classess.listContainer}>
          <Typography
            variant="h4"
            style={{ textAlign: "center", fontFamily: "cursive" }}
            className={classess.title}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            id="outlined-basic"
            onChange={(e) => setSearchValue(e.target.value)}
            label="Search for crypto currency..."
            style={{ margin: "1.5rem 0" }}
            variant="outlined"
          />
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <TableList
              handleSearch={handleSearch}
              symbol={symbol}
              page={page}
            />
          )}
          <Pagination
            count={(handleSearch().length / 10).toFixed(0)}
            setPage={setPage}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CoinList;
