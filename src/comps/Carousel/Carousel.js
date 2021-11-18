import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { makeStyles } from "@material-ui/core";

import { numberWithCommas } from "../numberWithCommas";
import { Link } from "react-router-dom";
//pausing carousel

import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const useStyles = makeStyles((theme) => ({
  innerCarousel: {
    minHeight: "15vh",
    border: "1px dahsed red",
    width: "100%",
    position: "relative",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
  },
  carouselImage: {
    width: "70px",
    [theme.breakpoints.down("xs")]: {
      width: "65px",
    },
  },

  carouselDesc: {
    textAlign: "center",
    marginTop: "0.6rem",
    marginBottom: "0.4rem",
    display: "flex",
  },
  name: {
    textTransform: "capitalize",
    marginRight: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  green: {
    color: "green",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  red: {
    color: "red",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
}));

const Carousel = ({ trendingDatas, symbol }) => {
  const classes = useStyles();

  //her bir item i burda yazdirib asagi gonderirik
  const items = trendingDatas.map((data) => {
    let price = data.price_change_percentage_24h.toFixed(2);
    return (
      <Link
        to={`/coins/${data.id}`}
        className={classes.carouselItem}
        key={data.id}
      >
        <img
          src={data.image}
          alt={data?.name}
          onDragStart={handleDragStart}
          className={classes.carouselImage}
        />
        <div className={classes.carouselDesc}>
          <div className={classes.name}>{data.symbol}</div>

          {price > 0 ? (
            <div className={classes.green}>+{price}%</div>
          ) : (
            <div className={classes.red}>{price}%</div>
          )}
        </div>
        <div className={classes.carouselPrice}>
          <p>
            {symbol}
            {numberWithCommas(data.current_price)}
            {/* {data.current_price} */}
          </p>
        </div>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.innerCarousel}>
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        autoPlayInterval={1050}
        animationDuration={1000}
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
