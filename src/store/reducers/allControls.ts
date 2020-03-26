import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlDesignDisplayProps } from '../../types';
import { ADD_CONTROL_TO_RENDER, CHANGE_CONTROL_METADATA } from '../actions/allControls';

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
      const { control, metadata } = action.payload;
      const { controls } = state;
      const mapped = controls.map(c => {
        return c.control.id === control.control.id
          ? {
              ...c,
              overriden: {
                ...metadata
              }
            }
          : c;
      });
      return {
        controls: [...mapped]
      };
    default:
      return state;
  }
};

export default allControls;
