import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Context from "./utils/context.js";
import { Provider } from "react-redux";
import store from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context>
      <Provider store={store}>
        <App />
      </Provider>
    </Context>
  </BrowserRouter>
);
