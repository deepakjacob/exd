import { FluxStandardAction } from 'redux-promise-middleware';

export const SELECT_RENDERED_CONTROL = "SELECT_RENDERED_CONTROL";

export const setSelectedComponent = (focussedControlId: string): FluxStandardAction => ({
  type: SELECT_RENDERED_CONTROL,
  payload: { focussedControlId }
});
