import { Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

export interface ToolbarState {
  isPending: boolean;
  tenants: any;
  time?: any;
}

const defaultState: ToolbarState = {
  isPending: false,
  tenants: []
};

const toolbar: Reducer = (
  state: ToolbarState = defaultState,
  action: FluxStandardAction
) => {
  switch (action.type) {
    case "GET_TENANT_FULFILLED":
      return {
        isPending: false,
        tenants: action.payload,
        error: false
      };
    case "GET_TENANT_PENDING":
      return {
        isPending: true,
        tenants: [],
        error: false
      };
    case "GET_TENANT_REJECTED":
      return {
        isPending: false,
        error: true,
        tenants: []
      };
    case "SAY_HELLO":
      return {
        time: action.payload
      };
    default:
      return state;
  }
};

export default toolbar;
