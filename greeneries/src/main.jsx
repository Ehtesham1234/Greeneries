import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./Components/ToggleColorMode/ToggleColorMode"; // Import the ToggleColorMode component
import { useAppTheme } from "./Theme/Theme"; // Import the useAppTheme function

function Main() {
  const { theme, colorMode } = useAppTheme();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
