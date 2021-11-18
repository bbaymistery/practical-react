import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";
import { Button, Stack } from "@mui/material";
//comps
import { SingleCoin } from "../config/api";
import { useGlobalContext } from "../context";
import { numberWithCommas } from "../comps/numberWithCommas";
import CoinInfo from "../comps/CoinInfo(Table)/CoinInfo";
import AlertMessage from "../comps/Alert";
//styles
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    justifyContent: "space-between",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      width: "30%",
      borderRight: "1px solid gray",
      height: "100%",
      justifyContent: "start",
      // alignItems: "start",
      // backgroundColor: "red",
    },
  },
  imageContainer: {
    width: "150px",
    marginTop: "1rem",
    marginBottom: "1rem",
    [theme.breakpoints.up("lg")]: {
      width: "220px",
    },
  },
  title: {
    fontFamily: "Shalimar",
    letterSpacing: "0.5rem",
    color: "yellow",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.2rem",
      marginBottom: "2rem",
    },
  },
  description: {
    fontFamily: "Red Hat Mono",
    lineHeight: "1.9rem",
    textAlign: "justify",
    padding: "0rem 0.9rem",
    wordBreak: "break-all",
    marginBottom: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".9rem",
      margin: "1.5rem 0rem",
    },
  },
  rankPriceMarket: {
    textAlign: "center",
    marginTop: "2rem",
  },
}));

const Coin = () => {
  const classes = useStyles();

  const { id } = useParams();

  const {
    coin,
    setCoin,
    currency,
    symbol,
    // id s olanlar buronun ac kapa olayi icindir
    watchIDs,
    removeItemFromWatchList,
    addItemToWatchList,
  } = useGlobalContext();
  //get single icon
  //toggle buttonun state seklinde ki durumunu toggle seklinde buna yazdk cunki her bir coin ucun ozel sekilde yazirix
  //for canceling axios
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const getSingleIcon = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));

      if (data) {
        let newData = {
          id: data.id,
          categories: data.categories[0],
          description: data.description.de.split(". ")[0],
          name: data.name,
          rank: data.market_cap_rank,
          dataOfIssues: data.genesis_date,
          image: data.image.large,
          price: data.market_data.current_price,
          marketCap: data.market_data.market_cap,
          toggle: false,
        };
        console.log(newData);

        setCoin(newData);
        // console.log(newData);
      } else {
        setCoin([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleIcon();
    return () => {
      source.cancel();
    };
  }, [currency, id]);

  const inWatchList = watchIDs.includes(coin?.id);

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div>
          <img src={coin.image} alt="" className={classes.imageContainer} />
        </div>
        <Typography variant="h3" className={classes.title}>
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin.description)}.
        </Typography>
        <Box className={classes.rankPriceMarket}>
          <Typography
            variant="h5"
            color={`${coin.rank < 4 ? "primary" : "error"}`}
          >
            Rank: {coin.rank}
          </Typography>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", marginTop: ".8rem" }}
          >
            Current Price: {symbol}{" "}
            {numberWithCommas(coin.price[currency.toLowerCase()])}
          </Typography>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", marginTop: ".8rem" }}
          >
            Market Cap: {symbol}{" "}
            {numberWithCommas(
              coin.marketCap[currency.toLowerCase()].toString().slice(0, -6)
            )}{" "}
          </Typography>
        </Box>

        {!inWatchList ? (
          <Button
            variant="contained"
            color="warning"
            style={{ marginTop: "1.5rem" }}
            onClick={() => addItemToWatchList(coin)}
          >
            Add To List
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "1.5rem" }}
            onClick={() => removeItemFromWatchList(coin)}
          >
            Remove From Watch List
          </Button>
        )}
      </div>

      {coin ? <CoinInfo id={id} coin={coin} /> : null}
    </div>
  );
};

export default Coin;
