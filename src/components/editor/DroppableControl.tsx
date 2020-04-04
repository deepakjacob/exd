import React, { FC } from 'react';
import { useDrop } from 'react-dnd';

import Box from '@material-ui/core/Box';

import { DraggableType } from '../../types';

let controlPosition: [number, number] = [1, 7];
let observers: PositionObserver[] = [];

export type PositionObserver = ((position: [number, number]) => void) | null;

function emitChange() {
  observers.forEach((o) => o && o(controlPosition));
}

export function moveControl(row: number, col: number) {
  controlPosition = [row, col];
  console.log(`moveControl => Moving control to ${row}, ${col}`);
  // console.log(".............................................");
  emitChange();
}

export function canMoveControl(prow: number, pcol: number) {
  const [row, col] = controlPosition;
  console.log(`canMoveControl  => Checking control in ${prow}, ${pcol}`);
  // console.log(`canMoveControl => Control is in ${row}, ${col}`);
  // console.log(".............................................");
  return !(prow === row && pcol === col);
}

interface DroppableControlProps {
  text: string;
  row: number;
  col: number;
}
const DroppableControl: FC<DroppableControlProps> = ({ text, row, col }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DraggableType.CONTROL,
    drop: () => moveControl(row, col),
    canDrop: () => canMoveControl(row, col),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {isOver && !canDrop && <Box>NO</Box>}
      {!isOver && canDrop && <Box>NO</Box>}
      {isOver && canDrop && <Box>YES</Box>}
    </div>
  );
};

export default DroppableControl;
