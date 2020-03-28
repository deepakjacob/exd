import { FluxStandardAction, AsyncAction } from "redux-promise-middleware";
import { saveAppState as saveState } from "../../backend/services";
import { ControlDesignDisplayProps } from "../../types";
import { State } from "../configureStore";

export const ADD_CONTROL_TO_RENDER = "ADD_CONTROL_TO_RENDER";
export const CHANGE_CONTROL_METADATA = "CHANGE_CONTROL_METADATA";
export const DELETE_CONTROL = "DELETE_CONTROL";
export const SAVE_APP_STATE = "SAVE_APP_STATE";

export const deleteControl = (controlId: string): FluxStandardAction => ({
  type: DELETE_CONTROL,
  payload: controlId,
});

export const addControl = (control: ControlDesignDisplayProps): FluxStandardAction => ({
  type: ADD_CONTROL_TO_RENDER,
  payload: control,
});

export const changeControlMetadata = (control: ControlDesignDisplayProps, metadata: any): FluxStandardAction => ({
  type: CHANGE_CONTROL_METADATA,
  payload: { control, metadata },
});

export const saveAppState = (state: State): AsyncAction => ({
  type: SAVE_APP_STATE,
  payload: saveState(state),
});
