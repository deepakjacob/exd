import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlMetadataProps } from '../../types';
import { ADD_CONTROL_TO_RENDER, CHANGE_CONTROL_METADATA } from '../actions/allControls';

export interface AllControlsState {
  controls: any[];
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
      const mapped = state.controls.map(c => {
        if (c.control.id === control.control.id) {
          return {
            ...c,
            overriden: {
              ...metadata
            }
          };
        }
        return c;
      });
      return {
        controls: [...mapped]
      };
    default:
      return state;
  }
};

export default allControls;
