import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//importing components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";

export const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </Router>
    </>
  );
};
