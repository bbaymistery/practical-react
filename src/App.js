import React, { useState, useEffect } from "react";

import { useGlobalContext } from "./context/context";
import Form from "./components/Form";
import ProductList from "./components/ProductList";
import Alert from "./components/Alert";
function App() {
  const { alert, removeAlert, list, total } = useGlobalContext();

  return (
    <main>
      <h1>Budget Calculator</h1>
      {alert.show && <Alert alert={alert} removeAlert={removeAlert} />}
      <div className="container">
        <Form />
        {list.length > 0 && <ProductList />}
      </div>

      {list.length > 0 ? (
        <h1>
          Total Spending <span className="btn">{total} $ </span>
        </h1>
      ) : (
        ""
      )}
    </main>
  );
}

export default App;
