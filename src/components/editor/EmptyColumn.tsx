import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import uuid from '../../uuid';
import DroppableControl from './DroppableControl';

interface EmptyColumnProps {
  row: number;
  col: number;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      border: `1px dashed ${theme.palette.primary.light}`,
    },
  })
);
const EmptyColumn: FC<EmptyColumnProps> = ({ row, col }: EmptyColumnProps) => {
  const classes = useStyles();
  return (
    <Grid key={uuid("col-")} item xs={1} className={classes.grid}>
      <DroppableControl row={row} col={col}></DroppableControl>
    </Grid>
  );
};

export default EmptyColumn;