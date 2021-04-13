import { AsyncAction, FluxStandardAction } from 'redux-promise-middleware';
import { getAppState as getState, saveAppState as saveState } from '../../backend/services';
import { ComponentDesignDisplayProps } from '../../types';
import { State } from '../configureStore';


export const GET_APP_STATE = "GET_APP_STATE";
export const ADD_COMPONENT_TO_RENDER = "ADD_COMPONENT_TO_RENDER";
export const CHANGE_COMPONENT_METADATA = "CHANGE_COMPONENT_METADATA";
export const DELETE_COMPONENT = "DELETE_COMPONENT";
export const SAVE_APP_STATE = "SAVE_APP_STATE";

export const deleteComponent = (componentId: string): FluxStandardAction => ({
  type: DELETE_COMPONENT,
  payload: componentId
});

export const addComponent = (component: ComponentDesignDisplayProps): FluxStandardAction => ({
  type: ADD_COMPONENT_TO_RENDER,
  payload: component
});

export const changeComponentMetadata = (component: ComponentDesignDisplayProps, metadata: any): FluxStandardAction => ({
  type: CHANGE_COMPONENT_METADATA,
  payload: { component: component, metadata }
});

export const saveAppState = (state: State): AsyncAction => ({
  type: SAVE_APP_STATE,
  payload: saveState(state)
});

export const getAppState = (id: string): FluxStandardAction => ({
  type: GET_APP_STATE,
  payload: getState(id)
});
