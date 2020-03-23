import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlMetadataProps } from '../../types';
import { ADD_CONTROL_TO_RENDER } from '../actions/allControls';

export interface AllControlsState {
  controls: ControlMetadataProps[];
}

const defaultState: AllControlsState = {
  controls: []
};

const allControls: Reducer = (state: AllControlsState = defaultState, action: FluxStandardAction) => {
  switch (action.type) {
    case ADD_CONTROL_TO_RENDER:
      return [...state.controls, action.payload];
    default:
      return state;
  }
};

export default allControls;
