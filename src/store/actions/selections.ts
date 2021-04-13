import { FluxStandardAction } from 'redux-promise-middleware';

/* for component selections */
export const SELECT_RENDERED_COMPONENT = "SELECT_RENDERED_COMPONENT";

export const setSelectedComponent = (focussedComponentId: string): FluxStandardAction => ({
  type: SELECT_RENDERED_COMPONENT,
  payload: { focussedComponentId }
});

/* for field selecttions within the component */
export const SELECT_RENDERED_FIELD = "SELECT_RENDERED_FIELD";

export const setSelectedField = (focussedFieldId: string): FluxStandardAction => ({
  type: SELECT_RENDERED_FIELD,
  payload: { focussedFieldId }
});
