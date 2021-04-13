import { FluxStandardAction } from 'redux-promise-middleware';

export const SELECT_RENDERED_COMPONENT = "SELECT_RENDERED_COMPONENT";

export const setSelectedComponent = (focussedComponentId: string): FluxStandardAction => ({
  type: SELECT_RENDERED_COMPONENT,
  payload: { focussedComponentId }
});
