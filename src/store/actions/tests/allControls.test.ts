import { DELETE_CONTROL, deleteControl, GET_APP_STATE, getAppState } from '../allControls';

jest.mock("../../../backend/services", () => ({
  getAppState: () => ({
    someKey: "someValue",
  }),
}));

describe("Actions", () => {
  it("should delete a control", () => {
    const controlId = "123_control";
    const deletedControl = deleteControl(controlId);
    expect(deletedControl).toStrictEqual({
      type: DELETE_CONTROL,
      payload: controlId,
    });
  });

  it("should getAppState when called", () => {
    const id = "uuid_123";
    const state = getAppState(id);
    expect(state).toStrictEqual({
      type: GET_APP_STATE,
      payload: {
        someKey: "someValue",
      },
    });
  });
});
