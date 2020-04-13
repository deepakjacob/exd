import { mount, shallow } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import Snackbar from '@material-ui/core/Snackbar';

import { DroppableControl, DroppableControlProps } from '../DroppableControl';

describe("DroppableControl", () => {
  it("Renders a component that can accept dropped control", () => {
    const props: DroppableControlProps = {
      row: 0,
      col: 0,
      children: "some child",
    };
    const droppableControl = shallow(
      <DndProvider backend={Backend}>
        <DroppableControl {...props} />
      </DndProvider>
    );
    expect(droppableControl).toMatchSnapshot();
  });

  it("Renders child", () => {
    const props: DroppableControlProps = {
      row: 0,
      col: 0,
      children: "some child",
    };
    const wrapper = mount(
      <DndProvider backend={Backend}>
        <DroppableControl {...props} />
      </DndProvider>
    );
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).props().open).toBe(false);
  });
});
