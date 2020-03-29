import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';

import allControls, { AllControlsState } from './reducers/allControls';
import selectedControl, { SelectedControlState } from './reducers/selectedControl';

export interface State {
  id: string;
  selectedControl: SelectedControlState;
  allControls: AllControlsState;
}

export default () => {
  const middlewares = [promise];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store = createStore(
    combineReducers({
      selectedControl,
      allControls
    }),
    {},
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};
