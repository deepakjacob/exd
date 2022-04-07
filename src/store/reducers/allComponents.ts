import { Reducer } from "redux";
import { FluxStandardAction } from "redux-promise-middleware";
import { AllComponentsState } from "../../types";
import {
  ADD_COMPONENT_TO_RENDER,
  CHANGE_COMPONENT_METADATA,
  DELETE_COMPONENT,
  GET_APP_STATE,
} from "../actions/allComponents";

const defaultState: AllComponentsState = {
  id: undefined,
  components: [],
};

const allComponents: Reducer = (
  state: AllComponentsState = defaultState,
  action: FluxStandardAction
): AllComponentsState => {
  switch (action.type) {
    case ADD_COMPONENT_TO_RENDER:
      return {
        id: state.id,
        components: [...(state.components || []), action.payload],
      };

    case CHANGE_COMPONENT_METADATA:
      const mapped = state.components.map((c) => {
        return c.component.id === action.payload.component.component.id
          ? {
              ...c,
              overriden: {
                ...action.payload.metadata,
              },
            }
          : c;
      });
      return {
        id: state.id,
        components: [...mapped],
      };

    case DELETE_COMPONENT:
      return { id: state.id, components: [...state.components.filter((c) => c.component.id !== action.payload)] };

    case `${GET_APP_STATE}_FULFILLED`:
      return {
        id: action.payload && action.payload.appState && action.payload.appState.id,
        components:
          action.payload &&
          action.payload.appState &&
          action.payload.appState.allComponents &&
          action.payload.appState.allComponents.components,
      };
    default:
      return state;
  }
};

export const getSelectedComponent = (state: AllComponentsState, focussedComponentId: string) =>
  state.components.filter((c) => c.component.id === focussedComponentId);

export default allComponents;
