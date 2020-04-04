import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { DraggableType } from '../../types';

interface ControlRepresentationProps {
  text: string;
}
const ControlRepresentation: FC<ControlRepresentationProps> = ({ text }) => (
  <ListItem button key={text}>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

interface DraggableControlRepresentationProps {
  text: string;
}
const DraggableControlRepresentation: FC<DraggableControlRepresentationProps> = ({ text }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DraggableType.CONTROL },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.2 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      <ControlRepresentation text={text} />
    </div>
  );
};

interface DraggableControlListProps {}

const DraggableControlList: FC<DraggableControlListProps> = () => (
  <>
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <DraggableControlRepresentation key={index} text={text} />
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <DraggableControlRepresentation key={index} text={text} />
      ))}
    </List>
  </>
);

export default DraggableControlList;
