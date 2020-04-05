import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { getDefinition } from '../../controlDefinitionRegister';
import { addControl } from '../../store/actions/allControls';
import { ControlItemDisplay, DraggableType } from '../../types';

export function moveControl(control: ControlItemDisplay, row: number, col: number, addControl: any) {
  const getControlDesignDisplayProps = getDefinition(control.type);
  if (getControlDesignDisplayProps) {
    const controlDesignDisplayProps = getControlDesignDisplayProps();
    controlDesignDisplayProps.gridPosition = {
      row,
      col,
    };

    addControl(controlDesignDisplayProps);
  }
}

export function canMoveControl(prow: number, pcol: number) {
  return true;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: theme.spacing(3),
    },
    highlightedItem: {
      // padding: theme.spacing(3),
      border: `2px dashed ${theme.palette.primary.main}`,
    },
  })
);
interface DroppableControlProps {
  row: number;
  col: number;
  children?: any;
}
const DroppableControl: FC<DroppableControlProps> = (props: any) => {
  const { row, col, children } = props;
  const classes = useStyles();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DraggableType.CONTROL,
    drop: (item, monitor: any) => {
      const { control } = monitor.getItem();
      return moveControl(control, row, col, props.addControl);
    },
    canDrop: () => canMoveControl(row, col),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div
      className={isOver && canDrop ? classes.highlightedItem : classes.item}
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

const mapDispatchToProps = {
  addControl,
};

const ConnectedDroppableControl = connect(undefined, mapDispatchToProps)(DroppableControl);

export default ConnectedDroppableControl;
