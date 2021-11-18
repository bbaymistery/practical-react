import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
//images
import Ben from "../../config/images/eski.jfif";
import { Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context";
import { numberWithCommas } from "../numberWithCommas";
const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "#171717",
    color: "#f5faf5",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    width: "150px",
    borderRadius: "50%",
  },
  title: {
    fontSize: "2.5rem",
    padding: "1.5rem 0rem",
  },
  container: {
    border: "1px solid gray",
    height: "50%",
    textAlign: "center",
    overflowY: "scroll",
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  containerTitle: {
    color: "whiteSmoke",
    paddingTop: "1rem",
    boxShadow: "0px 1px 0px 0px black",
  },
  containerButton: {
    color: "white !important",
    border: "1px solid black !important",
    textTransform: "capitalize !important",
    padding: ".5rem .9rem !important",
  },
  price: {
    color: "black !important",
  },
  listItem: {
    padding: "1rem",
    margin: "1rem 0px",
    borderRadius: "20px",
    backgroundColor: "gold",
  },
}));

export default function TemporaryDrawer({ children }) {
  //context stuffs
  //coin ve setCoin contextden gelir ve eyni zmnda single coin ile icerigi doluyor yani sxiousu singl e coinde cagririq
  const { watchListDatas, symbol, currency, removeItemFromWatchList } =
    useGlobalContext();

  //own state
  const [state, setState] = React.useState({
    right: false,
  });

  //for classes
  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className={classes.box}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <img src={Ben} alt={"Elgun"} className={classes.image} />
      <Typography
        className={classes.title}
        style={{ fontFamily: "cursive", color: "yellow" }}
      >
        Elgun Mr.$ Ezmemmedov
      </Typography>
      <Divider />
      {/* listeler  */}
      <Container className={classes.container}>
        {/* baslik yazisi liste icin */}
        {watchListDatas.length > 0 ? (
          <Typography variant="subtitle1" className={classes.containerTitle}>
            Watch List
          </Typography>
        ) : null}

        <List>
          {watchListDatas?.length > 0 ? (
            watchListDatas?.map((value) => (
              <ListItem
                className={classes.listItem}
                key={value.name}
                disableGutters
                secondaryAction={
                  <IconButton onClick={() => removeItemFromWatchList(value)}>
                    <DeleteSweepIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  style={{ color: "black" }}
                  primary={` ${value.name}`}
                  key={value.name}
                />
                <span className={classes.price}>
                  {symbol + " "}
                  {/* {value.price}$ */}
                  {numberWithCommas(value.price[currency.toLocaleLowerCase()])}
                </span>
              </ListItem>
            ))
          ) : (
            //eger watchlist kutusu bos ise
            <ListItem>
              <ListItemText
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                  textTransform: "capitalize",
                  letterSpacing: "5px",
                }}
                primary={`Add to watchlist something`}
              />
            </ListItem>
          )}
        </List>
      </Container>
      <Button
        size="medium"
        className={classes.containerButton}
        style={{ marginTop: "2rem" }}
      >
        LogOut
      </Button>
    </Box>
  );

  return (
    <React.Fragment key={"right"}>
      <Button onClick={toggleDrawer("right", true)}>{children}</Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}
