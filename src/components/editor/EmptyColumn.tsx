import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import uuid from '../../uuid';
import DroppableControl from './DroppableControl';

interface EmptyColumnProps {
  row: number;
  col: number;
  render?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      border: `1px dotted ${theme.palette.primary.light}`,
    },
  })
);
const EmptyColumn: FC<EmptyColumnProps> = ({ row, col, render }: EmptyColumnProps) => {
  const classes = useStyles();
  if (render) {
    return (
      <Grid key={uuid("col-")} xs={1} className={classes.grid}>
        <DroppableControl row={row} col={col}></DroppableControl>
      </Grid>
    );
  }
  return null;
};

export default EmptyColumn;
