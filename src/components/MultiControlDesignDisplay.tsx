import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
    changeControlMetadata, deleteControl as deleteControlDesign
} from '../store/actions/allControls';
import { setSelectedComponent } from '../store/actions/selectedControl';
import { State } from '../store/configureStore';
import { getSelectedControl } from '../store/reducers/allControls';
import { ControlDesignDisplayProps } from '../types';
import ControlDesignDisplay from './ControlDesignDisplay';
import ControlPropsDrawer from './ControlPropsDrawer';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: drawerWidth
    },
    grid: {
      border: `2px solid ${theme.palette.secondary.light}`
    }
  })
);

export interface MultiControlDesignDisplayProps {}

const MultiControlDesignDisplay: FC<MultiControlDesignDisplayProps> = (props: MultiControlDesignDisplayProps) => {
  const classes = useStyles();
  const {
    setSelectedComponent,
    focussedControlId,
    focussedControl,
    controls,
    changeControlProp,
    deleteControl
  } = props as any;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onFocus = (cdp: ControlDesignDisplayProps) => () => {
    setSelectedComponent(cdp.control.id);
    handleDrawerOpen();
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onDelete = (controlId: string) => {
    handleDrawerClose();
    deleteControl(controlId);
  };

  return (
    <>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen
        })}
      >
        <Grid container spacing={3}>
          {controls &&
            controls.map((cdp: ControlDesignDisplayProps, i: number) => {
              const w = cdp.overriden?.dimension?.width ? cdp.overriden.dimension.width : cdp.metadata.dimension.width;
              return (
                <Grid item xs={w} key={i}>
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
            })}
        </Grid>
        {focussedControl && (
          <ControlPropsDrawer
            changeControlProp={changeControlProp}
            onClose={handleDrawerClose}
            open={drawerOpen}
            focussedControl={focussedControl}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: State) => {
  const {
    selectedControl: { focussedControlId },
    allControls
  } = state;
  const { controls } = allControls;
  const filtered = focussedControlId ? getSelectedControl(allControls, focussedControlId) : undefined;
  const focussedControl = filtered && filtered.length > 0 ? filtered[0] : undefined;
  return { focussedControlId, focussedControl, controls };
};

const mapDispatchToProps = {
  setSelectedComponent,
  deleteControl: deleteControlDesign,
  changeControlProp: changeControlMetadata
};

const ConnectedFocussableMultiControlDesignDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiControlDesignDisplay);

export default ConnectedFocussableMultiControlDesignDisplay;
