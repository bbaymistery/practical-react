import {
  Button,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//context
import { useGlobalContext } from "../../context";
import Badge from "../Badge";
import RightSideBar from "../RightSideBar/RightSideBar";

const useStyles = makeStyles((theme) => ({
  container: {},
  toolbar: {
    minWidth: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "yellow",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.69rem",
    },
  },
  button: {
    padding: ".1rem .1rem",
    borderRadius: "6px",
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

  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".5rem",
    },
  },
  currency: {
    backgroundColor: "black",
    minWidth: " 12vh",
    height: "5.1vh",
    marginLeft: "15px",
    color: "white",
    marginRight: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "8.5vh",
      height: "3.5vh",
      fontSize: "0.7rem",
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#a7e08f",
    },
    type: "dark",
  },
});
const Header = () => {
  const classes = useStyles();
  const { currency, setCurrency } = useGlobalContext();
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCurrency(e.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.container}>
        <Toolbar className={classes.toolbar} position="static">
          <Typography variant="h6" component="div" className={classes.title}>
            <Link to="/" style={{ color: "yellow", textDecoration: "none" }}>
              Cripto Hunter
            </Link>
          </Typography>

          <div className={classes.rightSide}>
            <Select
              size={"small"}
              className={classes.currency}
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={handleChange}
              // style={{ width: 100, height: 40, marginLeft: 15 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"RUB"}>RUB</MenuItem>
            </Select>
            <RightSideBar>
              <Badge />
            </RightSideBar>
          </div>
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
};

export default Header;
