import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlDesignDisplayProps } from '../../types';
import {
    ADD_CONTROL_TO_RENDER, CHANGE_CONTROL_METADATA, DELETE_CONTROL, GET_APP_STATE
} from '../actions/allControls';

export interface AllControlsState {
  id: string | undefined;
  controls: ControlDesignDisplayProps[];
}

const defaultState: AllControlsState = {
  id: undefined,
  controls: [],
};

const allControls: Reducer = (state: AllControlsState = defaultState, action: FluxStandardAction): AllControlsState => {
  switch (action.type) {
    case ADD_CONTROL_TO_RENDER:
      return {
        id: state.id,
        controls: [...(state.controls || []), action.payload],
      };

    case CHANGE_CONTROL_METADATA:
      const mapped = state.controls.map((c) => {
        return c.control.id === action.payload.control.control.id
          ? {
              ...c,
              overriden: {
                ...action.payload.metadata,
              },
            }
          : c;
      });
      return {
        id: state.id,
        controls: [...mapped],
      };

    case DELETE_CONTROL:
      return { id: state.id, controls: [...state.controls.filter((c) => c.control.id !== action.payload)] };

    case `${GET_APP_STATE}_FULFILLED`:
      return {
        id: action.payload && action.payload.appState && action.payload.appState.id,
        controls:
          action.payload &&
          action.payload.appState &&
          action.payload.appState.allControls &&
          action.payload.appState.allControls.controls,
      };
    default:
      return state;
  }
};

export const getSelectedControl = (state: AllControlsState, focussedControlId: string) =>
  state.controls.filter((c) => c.control.id === focussedControlId);

export default allControls;
