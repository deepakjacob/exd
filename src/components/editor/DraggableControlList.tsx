import React, { FC } from "react";
import { useDrag } from "react-dnd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { getControlSettings } from "../../controlSetttingsRegister";
import { DraggableType, ControlItemDisplay } from "../../types";

const ControlRepresentation: FC<ControlItemDisplay> = (props: ControlItemDisplay) => {
  const { title } = props;
  return (
    <ListItem button key={title}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

interface DraggableControlItemDisplayProps {
  control: ControlItemDisplay;
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
    {getControlSettings().map((control: ControlItemDisplay, index) => (
      <DraggableControlRepresentation key={index} control={control} />
    ))}
  </List>
);

export default DraggableControlList;
