import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import TopScroll from "./utils/TopScroll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from '../src/redux/store'
const theme = createTheme({
    palette: {
      primary: {
        main: "#4821e7cc", // Replace the primary color with the provided color
      },
    },
  });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store = {store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TopScroll />
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
