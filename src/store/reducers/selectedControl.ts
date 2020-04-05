import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { SELECT_RENDERED_CONTROL } from '../actions/selectedControl';

export interface SelectedControlState {
  focussedControlId?: string;
}

const defaultState: SelectedControlState = {};

const selectedControl: Reducer = (state: SelectedControlState = defaultState, action: FluxStandardAction) => {
  switch (action.type) {
    case SELECT_RENDERED_CONTROL:
      return {
        focussedControlId: action.payload.focussedControlId
      };
    default:
      return state;
  }
};

export default selectedControl;
