import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies/:id">
          <SingleMovie />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
