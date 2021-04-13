import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import allComponents, { AllComponentsState } from './reducers/allComponents';
import selectedComponent, { SelectedComponentState as SelectedComponentState } from './reducers/selectedComponent';

export interface State {
  id: string;
  selectedComponent: SelectedComponentState;
  allComponents: AllComponentsState;
}

export default () => {
  const middlewares = [promise];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store = createStore(
    combineReducers({
      selectedComponent: selectedComponent,
      allComponents: allComponents
    }),
    {},
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};
