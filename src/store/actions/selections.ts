import { FluxStandardAction } from "redux-promise-middleware";
import { ComponentSelection, ComponentSelectionType, FieldSelection, SelectionState } from "../../types";

/* for component selections */
export const SELECT_RENDERED_FORM_COMPONENT = "SELECT_RENDERED_FORM_COMPONENT";
export const setSelectedFormComponent = (focussedComponentId: string): FluxStandardAction => ({
  type: SELECT_RENDERED_FORM_COMPONENT,
  payload: {
    info: { type: ComponentSelectionType.FORM, focussedComponentId },
  },
});

/* for field selecttions within the component */
export const SELECT_RENDERED_FORM_FIELD = "SELECT_RENDERED_FORM_FIELD";
export const setSelectedFormField = ({ focussedComponentId, focussedFieldId }: any): FluxStandardAction => ({
  type: SELECT_RENDERED_FORM_FIELD,
  payload: {
    info: { type: ComponentSelectionType.FIELD, focussedComponentId, focussedFieldId },
  },
});
