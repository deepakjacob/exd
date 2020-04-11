import React, { FC, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
    changeControlMetadata, deleteControl as deleteControlDesign, saveAppState
} from '../store/actions/allControls';
import { setSelectedComponent } from '../store/actions/selectedControl';
import { State } from '../store/configureStore';
import { getSelectedControl } from '../store/reducers/allControls';
import { ControlDesignDisplayProps } from '../types';
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

  const keyValueMap = controls.reduce((accumulator, cdp) => {
    let key = cdp.gridPosition?.row;
    if (key !== undefined && key >= 0) {
      if (!accumulator[key]) {
        accumulator[key] = [cdp];
      } else {
        accumulator[key] = [...accumulator[key], cdp];
      }
    }
    return accumulator;
  }, {} as any);
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
    changeControlProp,
    deleteControl,
    getAppState,
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

  const calcControlWidth = (cdp: ControlDesignDisplayProps) =>
    cdp.overriden?.dimension?.width ? (cdp.overriden.dimension.width as number) : cdp.metadata.dimension.width;
  const controlInCol = (cdp: ControlDesignDisplayProps, col: number) => cdp.gridPosition?.col === col;
  const controlNotInCol = (cdp: ControlDesignDisplayProps, col: number, width: number) => {
    const originalWidth = cdp.gridPosition?.col ? cdp.gridPosition?.col : 0;
    return originalWidth + width - 1 < col || originalWidth > col;
  };

  const mControls = mappedControls(controls);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} saveAppState={saveAppState} state={state} open={open} />
      <ControlDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.grid} />
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) =>
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => {
              const c: ControlDesignDisplayProps[] = mControls && mControls[row];
              if (c) {
                return c.map((cdp: ControlDesignDisplayProps) => {
                  let w: any = calcControlWidth(cdp);
                  if (controlInCol(cdp, col)) {
                    return (
                      <ControlColumn
                        onFocus={onFocus(cdp)}
                        cdp={cdp}
                        focussedControlId={focussedControlId}
                        onDelete={onDelete}
                        width={w}
                      />
                    );
                  }
                  if (controlNotInCol(cdp, col, w)) {
                    return <EmptyColumn row={row} col={col} />;
                  }
                });
              }
              return <EmptyColumn row={row} col={col} />;
            })
          )}
        </Grid>
      </main>
      {focussedControl && (
        <ControlPropsDrawer
          changeControlProp={changeControlProp}
          onClose={handleControlPropsDrawerOpen}
          open={controlPropsOpen}
          focussedControl={focussedControl}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const {
    selectedControl: { focussedControlId },
    allControls,
  } = state;
  const { controls } = allControls;
  const filtered = focussedControlId ? getSelectedControl(allControls, focussedControlId) : undefined;
  const focussedControl = filtered && filtered.length > 0 ? filtered[0] : undefined;
  return { focussedControlId, focussedControl, controls, state };
};

const mapDispatchToProps = {
  setSelectedComponent,
  deleteControl: deleteControlDesign,
  changeControlProp: changeControlMetadata,
  saveAppState,
};

const ConnectedDraggableMultiControlDesignDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiControlDesignDisplay);

const DndEnabledControl: FC<any> = (props: any) => (
  <DndProvider backend={Backend}>
    <ConnectedDraggableMultiControlDesignDisplay />
  </DndProvider>
);

export default DndEnabledControl;
