import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlMetadataProps } from '../../types';
import { SELECT_RENDERED_CONTROL } from '../actions/selectedControl';

export interface SelectedControlState {
  control?: ControlMetadataProps;
  focussedControlId?: string;
}

const defaultState: SelectedControlState = {};

const selectedControl: Reducer = (state: SelectedControlState = defaultState, action: FluxStandardAction) => {
  switch (action.type) {
    case SELECT_RENDERED_CONTROL:
      return {
        control: action.payload.control,
        focussedControlId: action.payload.focussedControlId
      };
    default:
      return state;
  }
};

export default selectedControl;
