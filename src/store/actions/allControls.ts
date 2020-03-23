import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlDesignDisplayProps } from '../../types';

export const ADD_CONTROL_TO_RENDER = "ADD_CONTROL_TO_RENDER";

export const addControl = (control: ControlDesignDisplayProps): FluxStandardAction => ({
  type: ADD_CONTROL_TO_RENDER,
  payload: { control }
});
