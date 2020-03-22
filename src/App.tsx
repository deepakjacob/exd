import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";

import DashBoardView from "./pages/Dashboard";

import configureStore from "./store/configureStore";

const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={DashBoardView} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
