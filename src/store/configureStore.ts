import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';

import allControls, { AllControlsState } from './reducers/allControls';
import selectedControl, { SelectedControlState } from './reducers/selectedControl';
import toolbar, { ToolbarState } from './reducers/toolbar';

export interface State {
  toolbar: ToolbarState;
  selectedControl: SelectedControlState;
  allControls: AllControlsState;
}

export default () => {
  const middlewares = [promise];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store = createStore(
    combineReducers({
      toolbar,
      selectedControl,
      allControls
    }),
    {},
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};
