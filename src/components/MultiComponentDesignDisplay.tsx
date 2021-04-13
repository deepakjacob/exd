import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useState } from 'react';
import { ComponentDesignDisplayProps } from '../types';
import ComponentDesignDisplay from './ComponentDesignDisplay';
import AppBar from './editor/AppBar';
import Toolbar from './editor/ComponentToolbar';
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
      margin: theme.spacing(3),
    },
  })
);

const mappedComponents = (components?: ComponentDesignDisplayProps[]) => {
  if (!components || components.length === 0) {
    return null;
  }

  const calcComponentWidth = (cdp: ComponentDesignDisplayProps) => {
    return cdp.overriden?.dimension?.width
      ? (cdp.overriden.dimension.width as number)
      : (cdp.metadata.dimension.width as number);
  };

  const keyValueMap = components.reduce(
    (accumulator, cdp) => {
      let row = cdp.gridPosition?.row;
      let col = cdp.gridPosition?.col;
      if (row !== undefined && row >= 0 && col !== undefined && col >= 0) {
        const width = calcComponentWidth(cdp);
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

export const MultiComponentDesignDisplay: FC<any> = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const {
    setSelectedComponent,
    focussedComponentId,
    components,
    deleteComponent,
    saveAppState,
    state,
  } = props as any;

  const onFocus = (cdp: ComponentDesignDisplayProps) => () => {
    if (focussedComponentId !== cdp.component.id) {
      setSelectedComponent(cdp.component.id);
    }
  };

  const onDelete = (componentId: string) => {
    handleToolbarCollapse();
    deleteComponent(componentId);
  };

  const handleToolbarExpand = () => {
    setOpen(true);
  };

  const handleToolbarCollapse = () => {
    setOpen(false);
  };

  const calcComponentWidth = (cdp: ComponentDesignDisplayProps): number => {
    const width: any = cdp.overriden?.dimension?.width ? cdp.overriden.dimension.width : cdp.metadata.dimension.width;
    return parseInt(width);
  };

  const mComponents = mappedComponents(components);

  type gridWidth = boolean | "auto" | 1 | 3 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleToolbarExpand} saveAppState={saveAppState} state={state} open={open} />
      <Toolbar open={open} handleToolbarCollapse={handleToolbarCollapse} />
      <main className={classes.content}>
        <div className={classes.grid} />
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => {
            let prevElem: any = undefined;
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col, i) => {
              const cdp: ComponentDesignDisplayProps = mComponents && mComponents[row][col];
              if (cdp) {
                prevElem = cdp;
                const w: any = calcComponentWidth(cdp) as gridWidth;

                return (
                  <Grid xs={w} key={`${row}-${col}`}>
                    <ComponentDesignDisplay
                      {...cdp}
                      onFocus={onFocus(cdp)}
                      hasFocus={`${cdp.component.id}` === focussedComponentId}
                      onDelete={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.stopPropagation();
                        onDelete(cdp.component.id);
                      }}
                    />
                  </Grid>
                );
              }
              if (prevElem && (prevElem as ComponentDesignDisplayProps).gridPosition?.row == row) {
                let next: number = (prevElem as ComponentDesignDisplayProps).gridPosition?.col as number;
                let nextCol: number = calcComponentWidth(prevElem) + next;
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
    </div>
  );
};

export default MultiComponentDesignDisplay;
