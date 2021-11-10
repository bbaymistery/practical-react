import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import Header from "./Components/Header/Header";
import MainNav from "./Components/MainNav";

//pages
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";

export const App = () => {
  return (
    <>
      <Router>
        <Header />{" "}
        <Switch>
          <Route exact path="/">
            <Trending />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
        <MainNav />
      </Router>
    </>
  );
};
