import React, { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import { addControl } from '../../store/actions/allControls';
import { ControlDesignDisplayProps, DraggableType } from '../../types';

const calcControlWidth = (cdp: ControlDesignDisplayProps): number => {
  const width: any = cdp.overriden?.dimension?.width ? cdp.overriden.dimension.width : cdp.metadata.dimension.width;
  return parseInt(width);
};

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function moveControl(
  control: ControlDesignDisplayProps,
  row: number,
  col: number,
  addControl: any,
  setOpen: (open: boolean) => void
) {
  const controlDesignDisplayProps = control;
  const canFit = calcControlWidth(control) + col - 1 < 12;
  if (!canFit) {
    setOpen(true);
    return null;
  }
  controlDesignDisplayProps.gridPosition = {
    row,
    col,
  };
  addControl(controlDesignDisplayProps);
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
      border: `1px solid ${theme.palette.primary.main}`,
    },
  })
);
interface DroppableControlProps {
  row: number;
  col: number;
  children?: any;
}

export const DroppableControl: FC<DroppableControlProps> = (props: any) => {
  const [open, setOpen] = useState(false);
  const { row, col, children } = props;
  const classes = useStyles();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DraggableType.CONTROL,
    drop: (item, monitor: any) => {
      const { control } = monitor.getItem();
      return moveControl(control, row, col, props.addControl, setOpen);
    },
    canDrop: () => canMoveControl(row, col),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Control cannot be placed as minimum width for component cannot be accommodated in available space
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapDispatchToProps = {
  addControl,
};

const ConnectedDroppableControl = connect(undefined, mapDispatchToProps)(DroppableControl);

export default ConnectedDroppableControl;
