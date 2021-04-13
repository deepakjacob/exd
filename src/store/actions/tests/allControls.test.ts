import { deleteComponent, DELETE_COMPONENT, getAppState, GET_APP_STATE } from '../allComponents';

jest.mock("../../../backend/services", () => ({
  getAppState: () => ({
    someKey: "someValue",
  }),
}));

describe("Actions", () => {
  it("should delete a component", () => {
    const componentId = "123_component";
    const deletedComponent = deleteComponent(componentId);
    expect(deletedComponent).toStrictEqual({
      type: DELETE_COMPONENT,
      payload: componentId,
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
