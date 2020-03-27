import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlDesignDisplayProps } from '../../types';
import {
    ADD_CONTROL_TO_RENDER, CHANGE_CONTROL_METADATA, DELETE_CONTROL
} from '../actions/allControls';

export interface AllControlsState {
  controls: ControlDesignDisplayProps[];
}

const defaultState: AllControlsState = {
  controls: []
};

const allControls: Reducer = (state: AllControlsState = defaultState, action: FluxStandardAction): AllControlsState => {
  switch (action.type) {
    case ADD_CONTROL_TO_RENDER:
      return {
        controls: [...state.controls, action.payload]
      };
    case CHANGE_CONTROL_METADATA:
      const mapped = state.controls.map(c => {
        return c.control.id === action.payload.control.control.id
          ? {
              ...c,
              overriden: {
                ...action.payload.metadata
              }
            }
          : c;
      });
      return {
        controls: [...mapped]
      };
    case DELETE_CONTROL:
      const filtered = state.controls.filter(c => c.control.id !== action.payload);
      return { controls: [...filtered] };
    default:
      return state;
  }
};

export default allControls;
