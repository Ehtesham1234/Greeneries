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
                  main: "#FFB7C5", // Pink blossom color
                }
              : {
                  main: "#065D29",
                },
          secondary:
            mode === "light"
              ? {
                  main: "#FF83FA", // Lighter shade of pink blossom
                }
              : {
                  main: "#04974D",
                },
          accent:
            mode === "light"
              ? {
                  main: "#EE82EE", // Different shade of pink blossom
                }
              : {
                  main: "#05AF46",
                },
          background:
            mode === "light"
              ? {
                  default: "#F5F5F5", // Light pink blossom for background
                  paper: "#F5F5F5F", // Light pink blossom for paper
                }
              : {
                  default: "#212121",
                  paper: "#212121",
                },
          text:
            mode === "light"
              ? {
                  primary: "#8B008B", // Dark pink blossom for primary text
                  secondary: "#FF6EB4", // Pink blossom for secondary text
                }
              : {
                  primary: "#eaf4e7",
                  secondary: "#3e981b",
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
