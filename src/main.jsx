import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";

import "@fontsource/lato";

import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./context/AppContext.jsx"; // Importar el Provider

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    mode: "light",
    primary: { main: "rgb(0, 0, 0)" },
    secondary: { main: "#26212E" },
    success: { main: "rgb(79, 77, 81)" },
    background: { default: "#FFFFFF", paper: "#F5F5F5" },
    text: { primary: "#26212E" },
    GrayText: { main: "rgb(79, 77, 81)" },
  },
});

// #FFFFFF
// #26212E
// #8E6FAB
//rgb(79, 77, 81)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
