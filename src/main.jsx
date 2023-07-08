import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </BrowserRouter>
  </React.StrictMode>
);
