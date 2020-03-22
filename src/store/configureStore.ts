import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import toolbar, { ToolbarState } from "./reducers/toolbar";
import control, { ControlState } from "./reducers/control";

export interface State {
    toolbar: ToolbarState;
    control: ControlState;
}

export default () => {
  const middlewares = [promise];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store = createStore(
    combineReducers({
        toolbar,
        control
    }),
    {},
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};
