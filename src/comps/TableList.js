import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { numberWithCommas } from "./numberWithCommas";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  image: {
    width: "32px",
    [theme.breakpoints.up("md")]: {
      width: "75px",
    },
  },

  price: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem !important",
    },
  },
  marketCap: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem !important",
    },
  },
  percentage: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem !important",
    },
  },
  imgName: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem !important",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".55rem ",
    },
  },
  imgSymbol: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem !important",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".56rem ",
    },
  },
}));
export default function TableList({ symbol, page, handleSearch }) {
  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 350, mb: 2, overflow: "hidden" }}
          aria-label="customized table"
        >
          <TableHead style={{ backgroundColor: "#EEBC1D" }}>
            <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                    textAlign: `${head === "Coin" ? "" : "right"}`,
                  }}
                  key={head}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((data, i) => (
                <TableRow
                  className={classes.row}
                  key={data.id}
                  onClick={() => navigate(`/coins/${data.id}`)}
                >
                  <TableCell
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={data.image}
                      alt={data.name}
                      className={classes.image}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "monoscope",
                      }}
                    >
                      <span
                        style={{
                          textTransform: "capitalize",
                          marginBottom: "0.5rem",
                        }}
                        className={classes.imgSymbol}
                      >
                        {data.symbol}
                      </span>
                      <span className={classes.imgName}>
                        {data.name.split(" ")[0]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "right",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                      fontSize: ".51rem",
                    }}
                    className={classes.price}
                  >
                    {symbol} {numberWithCommas(data.current_price)}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "700",
                      textAlign: "right",
                      fontFamily: "Montserrat",
                      fontSize: ".51rem",
                      color: `${
                        data.price_change_percentage_24h > 0 ? "green" : "red"
                      }`,
                    }}
                    className={classes.percentage}
                  >
                    {data.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell
                    className={classes.marketCap}
                    style={{
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                      textAlign: "right",
                      fontSize: ".61rem",
                    }}
                  >
                    <p>
                      {symbol + " "}
                      {numberWithCommas(
                        data.market_cap.toString().slice(0, -6)
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
