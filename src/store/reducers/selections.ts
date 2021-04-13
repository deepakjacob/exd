import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';
import { SELECT_RENDERED_COMPONENT, SELECT_RENDERED_FIELD } from '../actions/selections';

export interface SelectionState {
  focussedComponentId?: string;
  focussedFieldId?: string;
}

const defaultState: SelectionState = {};

const selections: Reducer = (state: SelectionState = defaultState, action: FluxStandardAction) => {
  switch (action.type) {
    case SELECT_RENDERED_COMPONENT:
      return {
        ...state,
        focussedComponentId: action.payload.focussedComponentId
      };
    case SELECT_RENDERED_FIELD:
      return {
        ...state,
        focussedFieldId: action.payload.focussedFieldId
      };
    default:
      return state;
  }
};

export default selections;
