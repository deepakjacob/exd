import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { ControlDesignDisplayProps } from '../../types';
import uuid from '../../uuid';
import ControlDesignDisplay from '../ControlDesignDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      border: `1px dashed ${theme.palette.primary.light}`,
    },
    item: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

interface ControlColumnProps {
  cdp: ControlDesignDisplayProps;
  focussedControlId: string;
  onDelete: any;
  onFocus: any;
  width: boolean | "auto" | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
}

const ControlColumn: FC<ControlColumnProps> = ({
  cdp,
  focussedControlId,
  onDelete,
  onFocus,
  width,
}: ControlColumnProps) => {
  const classes = useStyles();

  return (
    <Grid key={uuid("col-")} item xs={width} className={classes.grid}>
      <Box className={classes.item}>
        <ControlDesignDisplay
          {...cdp}
          onFocus={onFocus}
          hasFocus={`${cdp.control.id}` === focussedControlId}
          onDelete={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            onDelete(cdp.control.id);
          }}
        />
      </Box>
    </Grid>
  );
};

export default ControlColumn;
