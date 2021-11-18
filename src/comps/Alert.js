import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useGlobalContext } from "../context";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#a7e08f",
      mode: "dark",
    },
    type: "dark",
  },
});
export default function AlertMessage() {
  const { alert } = useGlobalContext();
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack
        sx={{
          width: "auto",
          bottom: "0px",
          position: "absolute",
        }}
        spacing={2}
      >
        {
          <Alert
            severity="info"
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              letterSpacing: "4px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {alert?.msg}
          </Alert>
        }
      </Stack>
    </ThemeProvider>
  );
}
