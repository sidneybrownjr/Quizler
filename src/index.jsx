import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./app/store";
import { Provider } from "react-redux";

import App from "./app/App";
import { ChakraProvider } from "@chakra-ui/react";

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
