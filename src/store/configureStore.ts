import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import allComponents, { AllComponentsState } from './reducers/allComponents';
import selections, { SelectionState as SelectionState } from './reducers/selections';

export interface State {
  id: string;
  selections: SelectionState;
  allComponents: AllComponentsState;
}

export default () => {
  const middlewares = [promise];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store = createStore(
    combineReducers({
      selections,
      allComponents
    }),
    {},
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};
