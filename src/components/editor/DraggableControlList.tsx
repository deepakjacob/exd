import React, { FC } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { common } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { getDefinitions } from '../../controlDefinitionRegister';
import { ControlDesignDisplayProps, DraggableType } from '../../types';
import boxImg from './boxImg';

const ControlRepresentation: FC<ControlDesignDisplayProps> = (props: ControlDesignDisplayProps) => {
  const {
    control: { label },
  } = props;
  return (
    <ListItem button key={label}>
      <ListItemIcon>
        <InboxIcon style={{ color: common.white }} />
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
  const [{ isDragging }, drag, preview] = useDrag({
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
      <>
        <DragPreviewImage connect={preview} src={boxImg} />
        <ControlRepresentation {...control} />
      </>
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
