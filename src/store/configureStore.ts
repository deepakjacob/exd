import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import allComponents from "./reducers/allComponents";
import selections from "./reducers/selections";

export default () => {
  const middlewares = [promise];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store = createStore(
    combineReducers({
      selections,
      allComponents,
    }),
    {},
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};
