import { Reducer } from "redux";
import { FluxStandardAction } from "redux-promise-middleware";
import { SelectionState } from "../../types";
import { SELECT_RENDERED_FORM_COMPONENT, SELECT_RENDERED_FORM_CONTROL } from "../actions/selections";

const defaultState: SelectionState = {};

const selectedComponent: Reducer = (
  state: SelectionState = defaultState,
  action: FluxStandardAction
): SelectionState => {
  switch (action.type) {
    case SELECT_RENDERED_FORM_COMPONENT:
      return {
        info: action.payload.info,
      };
    case SELECT_RENDERED_FORM_CONTROL:
      return {
        info: action.payload.info,
      };
    default:
      return state;
  }
};

export default selectedComponent;
