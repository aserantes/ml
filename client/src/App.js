import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./static/styles";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import SearchBar from "./SearchBar/SearchBar";
import ItemList from "./ItemList/ItemList";
import ItemDetails from "./ItemDetails/ItemDetails";

const Wrapper = styled.div`
  flex: auto;
  flex-direction: column;
`;

const App = () => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
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
      </ThemeProvider>
    </Wrapper>
  );
};

export default App;
