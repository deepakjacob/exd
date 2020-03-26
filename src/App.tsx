import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import configureStore from './store/configureStore';

const DashBoardView = React.lazy(() => import("./pages/Dashboard"));

const store = configureStore();
const Root = () => (
  <div>
    <CssBaseline />
    <Provider store={store}>
      <Suspense fallback={<div />}>
        <Router>
          <Switch>
            <Route exact path="/" component={DashBoardView} />
          </Switch>
        </Router>
      </Suspense>
    </Provider>
  </div>
);

export default Root;
