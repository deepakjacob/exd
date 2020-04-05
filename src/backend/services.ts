import { State } from '../store/configureStore';

const HOST_URL = "http://localhost:8000";
const APP_STATE_GET_URL = "/app/state/get";
const APP_STATE_SAVE_URL = "/app/state/save";

export const saveAppState = async (appState: State) => {
  const finalState = {
    id: "bffe3243-32af-41f6-a33d-ec6ef09d79f7",
    appState
  };
  const config = {
    method: "POST",
    body: JSON.stringify({ ...finalState }, null, 2),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  // TODO: handle exceptions - timeout, invalid responses, server errors
  const resp = await fetch(`${HOST_URL}${APP_STATE_SAVE_URL}`, config);
  return resp.json();
};

export const getAppState = async (id: string) => {
  const config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  // TODO: handle exceptions - timeout, invalid responses, server errors
  const resp = await fetch(`${HOST_URL}${APP_STATE_GET_URL}/${id}`, config);
  return resp.json();
};
