import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import uuid from '../../uuid';
import DroppableComponent from './DroppableComponent';



interface EmptyColumnProps {
  row: number;
  col: number;
  render?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      border: `1px dotted #d4d4d4`,
    },
  })
);
const EmptyColumn: FC<EmptyColumnProps> = ({ row, col, render }: EmptyColumnProps) => {
  const classes = useStyles();
  if (render) {
    return (
      <Grid key={uuid("col-")} xs={1} className={classes.grid}>
        <DroppableComponent row={row} col={col}></DroppableComponent>
      </Grid>
    );
  }
  return null;
};

export default EmptyColumn;
