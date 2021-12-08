import React from "react";
import App from "./App";
import { ProductProvider } from "./contexts/ProductContext";
import { render } from "react-dom";
import { CardContextProvider } from "./contexts/CardContext";
import { FilterContextProvider } from "./contexts/FilterContext";
render(
  <React.StrictMode>
    <FilterContextProvider>
      <ProductProvider>
        <CardContextProvider>
          <App />
        </CardContextProvider>
      </ProductProvider>
    </FilterContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
