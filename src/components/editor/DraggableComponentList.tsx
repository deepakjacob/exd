import { common } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React, { FC } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { getDefinitions } from '../../componentDefinitionRegister';
import { ComponentDesignDisplayProps, DraggableType } from '../../types';
import boxImg from './boxImg';

const ComponentRepresentation: FC<ComponentDesignDisplayProps> = (props: ComponentDesignDisplayProps) => {
  const {
    component: { label },
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

interface DraggableComponentItemDisplayProps {
  component: ComponentDesignDisplayProps;
}

const DraggableComponentRepresentation: FC<DraggableComponentItemDisplayProps> = (
  draggable: DraggableComponentItemDisplayProps
) => {
  const { component: component } = draggable;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DraggableType.COMPONENT, component },
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
        <ComponentRepresentation {...component} />
      </>
    </div>
  );
};

interface DraggableComponentListProps { }

const DraggableComponentList: FC<DraggableComponentListProps> = () => (
  <List>
    {getDefinitions().map((componentFn: any, index: number) => {
      const component = componentFn();
      return <DraggableComponentRepresentation key={index} component={component} />;
    })}
  </List>
);

export default DraggableComponentList;
