import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

//comps
import SelectButton from "../SelectButton/SelectButton";
import { chartDays } from "../../config/data";
import { useGlobalContext } from "../../context";
import { HistoricalChart } from "../../config/api";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const useStyles = makeStyles((theme) => ({
  info: {
    padding: "1.5rem 0rem",
    width: "90%",
    margin: "0.4rem auto",
    [theme.breakpoints.up("md")]: {
      width: "72%",
      height: "100%",
      // border: "1px solid red",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "62%",
      height: "100%",
    },
  },
}));

///grafikk dalgali olan
const CoinInfo = ({ id, coin }) => {
  const classes = useStyles();
  const [days, setDays] = useState(1);
  // console.log(coin);

  const [historicDatas, setHistoricDatas] = useState([]);
  const { currency } = useGlobalContext();

  //canceling axious
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  //getting datas
  useEffect(() => {
    const getHistory = async () => {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricDatas(data.prices);
    };

    getHistory();
    return () => {
      source.cancel();
    };
  }, [days, currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.info}>
        {!historicDatas ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={50}
            thickness={1}
            disableShrink
          />
        ) : (
          <Line
            data={{
              labels: historicDatas.map((coin) => {
                let date = new Date(coin[0]);
                // console.log(new Date(coin[0]));
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
                // console.log(date);
              }),
              datasets: [
                {
                  label: `Price (Past ${days} days) in ${currency}`,
                  data: historicDatas.map((coin) => coin[1]),
                  borderColor: "#EEBC1D", //duz xettin rengidir
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
