import { AsyncAction, FluxStandardAction } from 'redux-promise-middleware';

const HOST_URL = "http://localhost:8000";
const TENANT_FETCH_ALL_URL = "/tenant/findAll";

const fetchTenants = async () => {
  const resp = await fetch(`${HOST_URL}${TENANT_FETCH_ALL_URL}`);
  return resp.json();
};

export const getTenant = (): AsyncAction => ({
  type: "GET_TENANT",
  payload: fetchTenants
});

export const sayHello = (): FluxStandardAction => ({
  type: "SAY_HELLO",
  payload: new Date()
});
