import { FluxStandardAction } from "redux-promise-middleware";
import { ControlType } from "../../types";

/* for component selections */
export const SELECT_RENDERED_FORM_COMPONENT = "SELECT_RENDERED_FORM_COMPONENT";
export const setSelectedFormComponent = (focussedComponentId: string): FluxStandardAction => ({
  type: SELECT_RENDERED_FORM_COMPONENT,
  payload: {
    info: { type: ControlType.FORM, focussedComponentId },
  },
});

/* for field selections within the component */
export const SELECT_RENDERED_FORM_CONTROL = "SELECT_RENDERED_FORM_CONTROL";
export const setSelectedFormControl = ({
  controlType,
  focussedComponentId,
  focussedControlId,
}: any): FluxStandardAction => ({
  type: SELECT_RENDERED_FORM_CONTROL,
  payload: {
    // we may not know what type user selects on the component
    info: { type: controlType, focussedComponentId, focussedControlId },
  },
});

export const SELECT_RENDERED_DATA_TABLE_COLUMN = "SELECT_RENDERED_DATA_TABLE_COLUMN";
export const setSelectedDataTableColumn = ({
  focussedComponentId,
  focussedControlId,
  focussedDataTableColumnId,
}: any) => ({
  type: SELECT_RENDERED_DATA_TABLE_COLUMN,
  payload: {
    info: {
      type: ControlType.DATA_TABLE_COLUMN,
      focussedComponentId,
      focussedControlId,
      focussedDataTableColumnId,
    },
  },
});
