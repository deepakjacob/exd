import { Reducer } from "redux";
import { FluxStandardAction } from "redux-promise-middleware";
import { ControlMetadataProps } from "../../types";

export interface ControlState {
  control?: ControlMetadataProps;
  focussedControlId?: string;
}

const defaultState: ControlState = {};

const control: Reducer = (state: ControlState = defaultState, action: FluxStandardAction) => {
  switch (action.type) {
    case "SELECT_RENDERED_CONTROL":
      const { control, focussedControlId } = action.payload;
      return {
        control,
        focussedControlId
      };
    default:
      return state;
  }
};

export default control;
