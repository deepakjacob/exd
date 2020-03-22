import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import DashBoardView from "./pages/Dashboard";
import configureStore from "./store/configureStore";

const store = configureStore();
const Root = () => (
  <div>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={DashBoardView} />
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default Root;
