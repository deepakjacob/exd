import React, { FC, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ControlDesignDisplayProps } from '../types';
import ControlDesignDisplay from './ControlDesignDisplay';
import ControlPropsDrawer from './ControlPropsDrawer';
import AppBar from './editor/AppBar';
import ControlColumn from './editor/ControlColumn';
import ControlDrawer from './editor/ControlDrawer';
import EmptyColumn from './editor/EmptyColumn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },

    grid: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  })
);

const mappedControls = (controls?: ControlDesignDisplayProps[]) => {
  if (!controls || controls.length === 0) {
    return null;
  }

  const calcControlWidth = (cdp: ControlDesignDisplayProps) => {
    return cdp.overriden?.dimension?.width
      ? (cdp.overriden.dimension.width as number)
      : (cdp.metadata.dimension.width as number);
  };

  const keyValueMap = controls.reduce(
    (accumulator, cdp) => {
      let row = cdp.gridPosition?.row;
      let col = cdp.gridPosition?.col;
      if (row !== undefined && row >= 0 && col !== undefined && col >= 0) {
        const width = calcControlWidth(cdp);
        accumulator[row][col] = cdp;
        col += width;
      }
      return accumulator;
    },
    // {} as any
    [...Array(12)].map((x) => Array(12).fill(null))
  );
  return keyValueMap;
};

export const MultiControlDesignDisplay: FC<any> = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [controlPropsOpen, setControlPropsOpen] = useState(false);

  const {
    setSelectedComponent,
    focussedControlId,
    focussedControl,
    controls,
    changeControlMetadata,
    deleteControl,
    saveAppState,
    state,
  } = props as any;

  const onFocus = (cdp: ControlDesignDisplayProps) => () => {
    setSelectedComponent(cdp.control.id);
    handleControlPropsDrawerOpen();
  };

  const onDelete = (controlId: string) => {
    handleDrawerClose();
    deleteControl(controlId);
  };

  const handleControlPropsDrawerOpen = () => {
    setControlPropsOpen(true);
  };

  const handleControlPropsDrawerClose = () => {
    setControlPropsOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const calcControlWidth = (cdp: ControlDesignDisplayProps): number => {
    const width: any = cdp.overriden?.dimension?.width ? cdp.overriden.dimension.width : cdp.metadata.dimension.width;
    return parseInt(width);
  };

  const mControls = mappedControls(controls);

  type gridWidth = boolean | "auto" | 1 | 3 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} saveAppState={saveAppState} state={state} open={open} />
      <ControlDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.grid} />
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => {
            let prevElem: any = undefined;
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col, i) => {
              const cdp: ControlDesignDisplayProps = mControls && mControls[row][col];
              if (cdp) {
                prevElem = cdp;
                const w: any = calcControlWidth(cdp) as gridWidth;

                return (
                  <Grid xs={w} key={`${row}-${col}`}>
                    <ControlDesignDisplay
                      {...cdp}
                      onFocus={onFocus(cdp)}
                      hasFocus={`${cdp.control.id}` === focussedControlId}
                      onDelete={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.stopPropagation();
                        onDelete(cdp.control.id);
                      }}
                    />
                  </Grid>
                );
              }
              if (prevElem && (prevElem as ControlDesignDisplayProps).gridPosition?.row == row) {
                let next: number = (prevElem as ControlDesignDisplayProps).gridPosition?.col as number;
                let nextCol: number = calcControlWidth(prevElem) + next;
                if (col >= nextCol) {
                  return <EmptyColumn row={row} col={col} render={true} key={`${row}-${col}`} />;
                }
              } else {
                return <EmptyColumn row={row} col={col} render={true} key={`${row}-${col}`} />;
              }
            });
          })}
        </Grid>
      </main>
      {focussedControl && (
        <ControlPropsDrawer
          changeControlProp={changeControlMetadata}
          onClose={handleControlPropsDrawerOpen}
          open={controlPropsOpen}
          focussedControl={focussedControl}
        />
      )}
    </div>
  );
};

export default MultiControlDesignDisplay;
