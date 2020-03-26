import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlDesignDisplayProps } from '../../types';

export const ADD_CONTROL_TO_RENDER = "ADD_CONTROL_TO_RENDER";
export const CHANGE_CONTROL_METADATA = "CHANGE_CONTROL_METADATA";

export const addControl = (control: ControlDesignDisplayProps): FluxStandardAction => ({
  type: ADD_CONTROL_TO_RENDER,
  payload: control
});

export const changeControlMetadata = (control: ControlDesignDisplayProps, metadata: any): FluxStandardAction => ({
  type: CHANGE_CONTROL_METADATA,
  payload: { control, metadata }
});
