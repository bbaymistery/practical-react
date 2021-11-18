import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

//own stufss

//comps
import Image from "../../config/images/banner2.jpg";
import Carousel from "../Carousel/Carousel";

import { useGlobalContext } from "../../context";
import { TrendingCoins } from "../../config/api";
const useStyles = makeStyles((theme) => ({
  hero: {
    minHeight: "45vh",
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  container: {
    height: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "blue",
  },
  carousel: {
    minHeight: "15vh",
    backgroundColor: "red",
    width: "100%",
    position: "relative",
  },
  heroTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5rem",
    },
  },
}));

const Hero = () => {
  const classes = useStyles();

  const { currency, symbol } = useGlobalContext();
  const [trendingDatas, setTrendingDatas] = useState([]);
  //get trending cripto and sen that to carousel
  const getTrending = useCallback(async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      //eger data true ise
      if (data) {
        let newDatas = data.map((d) => {
          const {
            id,
            name,
            symbol,
            image,
            current_price,
            price_change_percentage_24h,
          } = d;

          return {
            id,
            name,
            symbol,
            image,
            current_price,
            price_change_percentage_24h,
          };
        });

        setTrendingDatas(newDatas);
      } else {
        setTrendingDatas([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currency]);

  //getting trendings
  useEffect(() => {
    getTrending();
  }, [currency]);

  return (
    <div className={classes.hero}>
      <Container className={classes.container}>
        <Box mt={5} style={{ textAlign: "center" }}>
          <Typography
            style={{ marginBottom: ".5rem" }}
            className={classes.heroTitle}
            variant="h2"
          >
            Crypto Hunter
          </Typography>
          <Typography variant="caption" style={{ color: "yellow" }}>
            @Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </Box>
        {/* {trendingDatas && ( */}
        <Carousel symbol={symbol} trendingDatas={trendingDatas} />
        {/* )} */}
      </Container>
    </div>
  );
};

export default Hero;
{
  /*  */
}

{
  /* {loading ? (
          <Loading />
        ) : (
          <Carousel
            symbol={symbol}
            trendingDatas={trendingDatas}
            currency={currency}
          />
        )} */
}
