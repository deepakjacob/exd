import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';
import { SELECT_RENDERED_COMPONENT as SELECT_RENDERED_COMPONENT } from '../actions/selectedComponent';


export interface SelectedComponentState {
  focussedComponentId?: string;
}

const defaultState: SelectedComponentState = {};

const selectedComponent: Reducer = (state: SelectedComponentState = defaultState, action: FluxStandardAction) => {
  switch (action.type) {
    case SELECT_RENDERED_COMPONENT:
      return {
        focussedComponentId: action.payload.focussedComponentId
      };
    default:
      return state;
  }
};

export default selectedComponent;
