import { createTheme } from "@mui/material";
import React from "react";

export function useAppTheme() {
  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary:
            mode === "light"
              ? {
                  main: "#71c74d",
                }
              : {
                  main: "#5db238",
                },
          secondary:
            mode === "light"
              ? {
                  main: "#a3e289",
                }
              : {
                  main: "#38771d",
                },
          accent:
            mode === "light"
              ? {
                  main: "#8be467",
                }
              : {
                  main: "#3e981b",
                },
          background:
            mode === "light"
              ? {
                  default: "#f8fcf7", // light mode background color
                  paper: "#f8fcf7", // light mode paper color
                }
              : {
                  default: "#040703", // dark mode background color
                  paper: "#040703", // dark mode paper color
                },
          text:
            mode === "light"
              ? {
                  primary: "#101a0c", // light mode primary text color
                  secondary: "#8be467", // light mode secondary text color
                }
              : {
                  primary: "#eaf4e7", // dark mode primary text color
                  secondary: "#3e981b", // dark mode secondary text color
                },
        },
        typography: {
          fontFamily: "Roboto", // Your font family
        },
      }),
    [mode]
  );

  return { theme, colorMode };
}
