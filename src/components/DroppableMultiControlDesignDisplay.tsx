import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
    changeControlMetadata, deleteControl as deleteControlDesign, saveAppState
} from '../store/actions/allControls';
import { setSelectedComponent } from '../store/actions/selectedControl';
import { State } from '../store/configureStore';
import { getSelectedControl } from '../store/reducers/allControls';
import { ControlDesignDisplayProps } from '../types';
import uuid from '../uuid';
import ControlDesignDisplay from './ControlDesignDisplay';
import AppBar from './editor/AppBar';
import DraggableControlList from './editor/DraggableControlList';
import DroppableControl from './editor/DroppableControl';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
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

const mappedControls = (controls?: ControlDesignDisplayProps[]) => {
  if (!controls || controls.length === 0) {
    return null;
  }

  const keyValueMap = controls.reduce((accumulator, cdp) => {
    let key = cdp.gridPosition?.row;
    // cant check !key since zero is valid key i.e., first row
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
  const onFocus = (cdp: ControlDesignDisplayProps) => {
    setSelectedComponent(cdp.control.id);
    handleDrawerOpen();
  };

  const onDelete = (controlId: string) => {
    handleDrawerClose();
    deleteControl(controlId);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const mControls = mappedControls(controls);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} saveAppState={saveAppState} state={state} open={open} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <DraggableControlList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => {
              const c: ControlDesignDisplayProps[] = mControls && mControls[row];
              if (c) {
                return c.map((cdp: ControlDesignDisplayProps) => {
                  let w: any = cdp.overriden?.dimension?.width
                    ? (cdp.overriden.dimension.width as number)
                    : cdp.metadata.dimension.width;
                  if (cdp.gridPosition?.col === col) {
                    return (
                      <Grid key={uuid("col-")} item xs={w} className={classes.grid}>
                        <Box className={classes.item}>
                          <ControlDesignDisplay
                            {...cdp}
                            onFocus={() => {}}
                            hasFocus={`${cdp.control.id}` === focussedControlId}
                            onDelete={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                              e.stopPropagation();
                              onDelete(cdp.control.id);
                            }}
                          />
                        </Box>
                      </Grid>
                    );
                  }
                  if (
                    cdp.gridPosition?.col + w - 1 < col ||
                    (cdp.gridPosition?.col ? cdp.gridPosition?.col : 0) > col
                  ) {
                    // a component is present in the row and
                    // only put placeholder columns for columns
                    // the component is not occupying
                    // console.log("N1 when row, col => ", row, col);
                    return (
                      <Grid key={uuid("col-")} item xs={1} className={classes.grid}>
                        <DroppableControl row={row} col={col}></DroppableControl>
                      </Grid>
                    );
                  }
                });
              }
              // no component is present in the row or this is the
              // first time rendering of the app.
              // console.log("N2 when row, col => ", row, col);
              return (
                <Grid key={uuid("col-")} item xs={1} className={classes.grid}>
                  <DroppableControl row={row} col={col}></DroppableControl>
                </Grid>
              );
            });
          })}
        </Grid>
      </main>
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
