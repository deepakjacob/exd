import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { getDefinitions } from '../../controlDefinitionRegister';
import { ControlDesignDisplayProps, DraggableType } from '../../types';

const ControlRepresentation: FC<ControlDesignDisplayProps> = (props: ControlDesignDisplayProps) => {
  const {
    control: { label },
  } = props;
  return (
    <ListItem button key={label}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

interface DraggableControlItemDisplayProps {
  control: ControlDesignDisplayProps;
}

const DraggableControlRepresentation: FC<DraggableControlItemDisplayProps> = (
  draggable: DraggableControlItemDisplayProps
) => {
  const { control } = draggable;
  const [{ isDragging }, drag] = useDrag({
    item: { type: DraggableType.CONTROL, control },
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
      <ControlRepresentation {...control} />
    </div>
  );
};

interface DraggableControlListProps {}

const DraggableControlList: FC<DraggableControlListProps> = () => (
  <List>
    {getDefinitions().map((controlFn: any, index: number) => {
      const control = controlFn();
      return <DraggableControlRepresentation key={index} control={control} />;
    })}
  </List>
);

export default DraggableControlList;
