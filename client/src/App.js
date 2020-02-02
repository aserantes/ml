import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import SearchBar from "./SearchBar/SearchBar";
import ItemList from "./ItemList/ItemList";
import ItemDetails from "./ItemDetails/ItemDetails";

const App = () => {
  return (
    <main role="main">
      <Router>
        <SearchBar />
        <Switch>
          <Route exact path="/items">
            <ItemList />
          </Route>
          <Route path="/items/:id">
            <ItemDetails />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
