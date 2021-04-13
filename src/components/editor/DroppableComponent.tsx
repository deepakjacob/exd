import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import React, { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { addComponent } from '../../store/actions/allComponents';
import { ComponentDesignDisplayProps, DraggableType } from '../../types';



const calcComponentWidth = (cdp: ComponentDesignDisplayProps): number => {
  const width: any = cdp.overriden?.dimension?.width ? cdp.overriden.dimension.width : cdp.metadata.dimension.width;
  return parseInt(width);
};

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function moveComponent(
  component: ComponentDesignDisplayProps,
  row: number,
  col: number,
  addComponent: any,
  setOpen: (open: boolean) => void
) {
  const componentDesignDisplayProps = component;
  const canFit = calcComponentWidth(component) + col - 1 < 12;
  if (!canFit) {
    setOpen(true);
    return null;
  }
  componentDesignDisplayProps.gridPosition = {
    row,
    col,
  };
  addComponent(componentDesignDisplayProps);
}

export function canMoveComponent(prow: number, pcol: number) {
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
interface DroppableComponentProps {
  row: number;
  col: number;
  children?: any;
}

export const DroppableComponent: FC<DroppableComponentProps> = (props: any) => {
  const [open, setOpen] = useState(false);
  const { row, col, children } = props;
  const classes = useStyles();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DraggableType.COMPONENT,
    drop: (item, monitor: any) => {
      const { component } = monitor.getItem();
      return moveComponent(component, row, col, props.addComponent, setOpen);
    },
    canDrop: () => canMoveComponent(row, col),
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
          Component cannot be placed as minimum width for component cannot be accommodated in available space
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapDispatchToProps = {
  addComponent: addComponent,
};

const ConnectedDroppableComponent = connect(undefined, mapDispatchToProps)(DroppableComponent);

export default ConnectedDroppableComponent;
