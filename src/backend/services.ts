import { State } from "../store/configureStore";

const HOST_URL = "http://localhost:8000";
const APP_STATE_SAVE_URL = "/app/state/save";

export const saveAppState = async (appState: State) => {
  const config = {
    method: "POST",
    body: JSON.stringify({ appState }, null, 2),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  // TODO: handle exceptions - timeout, invalid responses, server errors
  const resp = await fetch(`${HOST_URL}${APP_STATE_SAVE_URL}`, config);
  return resp.json();
};
