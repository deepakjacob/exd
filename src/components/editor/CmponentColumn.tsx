import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { ComponentDesignDisplayProps } from '../../types';
import uuid from '../../uuid';
import ComponentDesignDisplay from '../ComponentDesignDisplay';

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

interface ComponentColumnProps {
  cdp: ComponentDesignDisplayProps;
  focussedComponentId: string;
  onDelete: any;
  onFocus: any;
  width: boolean | "auto" | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
}

const ComponentColumn: FC<ComponentColumnProps> = ({
  cdp,
  focussedComponentId: focussedComponentId,
  onDelete,
  onFocus,
  width,
}: ComponentColumnProps) => {
  const classes = useStyles();

  return (
    <Grid key={uuid("col-")} item xs={width} className={classes.grid}>
      <Box className={classes.item}>
        <ComponentDesignDisplay
          {...cdp}
          onFocus={onFocus}
          hasFocus={`${cdp.component.id}` === focussedComponentId}
          onDelete={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            onDelete(cdp.component.id);
          }}
        />
      </Box>
    </Grid>
  );
};

export default ComponentColumn;
