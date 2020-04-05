import { State } from '../store/configureStore';
import { GridPosition } from '../types';

const HOST_URL = "http://localhost:8000";
const APP_STATE_GET_URL = "/app/state/get";
const APP_STATE_SAVE_URL = "/app/state/save";

export const saveAppState = async (appState: State) => {
  const finalState = {
    id: "bffe3243-32af-41f6-a33d-ec6ef09d79f7",
    appState,
  };
  const config = {
    method: "POST",
    body: JSON.stringify({ ...finalState }, null, 2),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  // TODO: handle exceptions - timeout, invalid responses, server errors
  const resp = await fetch(`${HOST_URL}${APP_STATE_SAVE_URL}`, config);
  return resp.json();
};

export const getAppState = (id: string) => {
  return Promise.resolve({
    id: "bffe3243-32af-41f6-a33d-ec6ef09d79f7",
    appState: {
      selectedControl: {},
      allControls: {
        controls: [
          {
            control: {
              id: "ENTRY_FIELD_CONTROL_ID_7c13-715b-b6c6-46a5-cca2-4b1b-b8b6-89fe",
              name: "ENTRY_FIELD_CONTROL_NAME_271c-7997-b511-2b99-bfc5-2d75-8bd1-9e77",
              designControlType: "ENTRY_FIELD",
              label: "Entry Field Label",
              defaultValue: "Hello World",
              helperText: "This is some addtional info",
            },
            metadata: { dimension: { width: 12 } },
            overriden: {
              dimension: { width: "" },
            },
            gridPosition: { row: 1, col: 0 },
            fields: [
              {
                control: {
                  id: "label_field_id_9493-2d6f-08ff-b2d3-fe97-73f9-4d16-094f",
                  name: "label_field_name_d855-deee-8b47-c42a-f4bf-093b-fd72-5685",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "LABEL",
                },
                metadata: { dimension: { width: 12 } },
                overriden: { dimension: { width: "" } },
              },
              {
                control: {
                  id: "entry_field_id_4fb2-fe16-a396-4de5-00bc-2995-a1f8-6abf",
                  name: "entry_field_name_695c-7e48-cf04-4189-ce17-4032-2155-ece7",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "TEXT",
                },
                metadata: { dimension: { width: 4 } },
                overriden: { dimension: { width: "" } },
              },
              {
                control: {
                  id: "entry_field_id_b5b5-9375-dfb8-7f89-0501-376d-41e4-62ed",
                  name: "entry_field_name_f851-ad8b-7e32-230e-5b8b-68ec-4576-f7ac",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "TEXT",
                },
                metadata: { dimension: { width: 8 } },
                overriden: { dimension: { width: "" } },
              },
              {
                control: {
                  id: "entry_field_id_3026-2e58-7dbb-a67c-e7bf-0de9-472d-46c5",
                  name: "entry_field_name_107a-7b27-a0c9-1125-c565-8e94-9c49-4c2c",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "SELECT",
                },
                metadata: { dimension: { width: 8 } },
                overriden: {
                  dimension: { width: "" },
                },
              },
            ],
          },
          {
            control: {
              id: "ENTRY_FIELD_CONTROL_ID_2567-137a-b298-d091-1171-0d9b-e4d2-2ec8",
              name: "ENTRY_FIELD_CONTROL_NAME_8132-ab25-60c2-44b9-cc34-fae4-997d-e99b",
              designControlType: "ENTRY_FIELD",
              label: "Entry Field Label",
              defaultValue: "Hello World",
              helperText: "This is some addtional info",
            },
            metadata: { dimension: { width: 12 } },
            overriden: { dimension: { width: "8" } },
            gridPosition: { row: 1, col: 2 },
            fields: [
              {
                control: {
                  id: "label_field_id_4e35-140e-14f8-f6cc-9c86-c536-e6ca-8e44",
                  name: "label_field_name_49f1-e71b-a85d-c118-f189-d3d6-053a-76a1",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "LABEL",
                },
                metadata: { dimension: { width: 12 } },
                overriden: { dimension: { width: "" } },
              },
              {
                control: {
                  id: "entry_field_id_f1db-16c3-e147-b571-ad2a-424a-a69f-6e4d",
                  name: "entry_field_name_1a46-45bc-0cc5-318a-e72c-aacf-88ae-d1d1",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "TEXT",
                },
                metadata: { dimension: { width: 4 } },
                overriden: { dimension: { width: "" } },
              },
              {
                control: {
                  id: "entry_field_id_a12a-fcd2-9c66-bf05-5b15-53e5-69f9-d1e4",
                  name: "entry_field_name_4651-3f52-4923-20bc-39b8-361e-261c-5671",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "TEXT",
                },
                metadata: { dimension: { width: 8 } },
                overriden: { dimension: { width: "" } },
              },
              {
                control: {
                  id: "entry_field_id_34b8-549a-c90a-c572-c8d7-4a6f-0f5c-b165",
                  name: "entry_field_name_a307-d4d8-2936-e408-bc4a-48f8-621c-8f1f",
                  label: "Entry Field Label",
                  defaultValue: "Hello World",
                  helperText: "This is some addtional info",
                  type: "SELECT",
                },
                metadata: { dimension: { width: 8 } },
                overriden: { dimension: { width: "" } },
              },
            ],
          },
        ],
      },
    },
  });
};

export const _getAppState = async (id: string) => {
  const config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  // TODO: handle exceptions - timeout, invalid responses, server errors
  const resp = await fetch(`${HOST_URL}${APP_STATE_GET_URL}/${id}`, config);
  return resp.json();
};
