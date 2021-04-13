import Snackbar from '@material-ui/core/Snackbar';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { DroppableComponent, DroppableComponentProps } from '../DroppableComponent';



describe("DroppableComponent", () => {
  it("Renders a component that can accept dropped component", () => {
    const props: DroppableComponentProps = {
      row: 0,
      col: 0,
      children: "some child",
    };
    const droppableComponent = shallow(
      <DndProvider backend={Backend}>
        <DroppableComponent {...props} />
      </DndProvider>
    );
    expect(droppableComponent).toMatchSnapshot();
  });

  it("Renders child", () => {
    const props: DroppableComponentProps = {
      row: 0,
      col: 0,
      children: "some child",
    };
    const wrapper = mount(
      <DndProvider backend={Backend}>
        <DroppableComponent {...props} />
      </DndProvider>
    );
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).props().open).toBe(false);
  });
});
