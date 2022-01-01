import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/themes";

// Redux
// MUI Theme
// Router
// Strict
// App

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
