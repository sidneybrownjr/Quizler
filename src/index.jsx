import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./app/store";
import { Provider } from "react-redux";

import "./index.css";
import "animate.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./app/App";

render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
