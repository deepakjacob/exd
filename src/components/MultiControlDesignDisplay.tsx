import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { changeControlMetadata } from '../store/actions/allControls';
import { setSelectedComponent } from '../store/actions/selectedControl';
import { State } from '../store/configureStore';
import { ControlDesignDisplayProps } from '../types';
import ControlDesignDisplay from './ControlDesignDisplay';
import ControlPropsDrawer from './ControlPropsDrawer';

export interface MultiControlDesignDisplayProps {}

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

const MultiControlDesignDisplay: React.FC<MultiControlDesignDisplayProps> = (props: MultiControlDesignDisplayProps) => {
  const classes = useStyles();
  const { setSelectedComponent, selectedControl, controls, changeControlProp } = props as any;
  const { focussedControlId, control } = selectedControl;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const onFocus = (cdp: ControlDesignDisplayProps, setSelectedComponent: any) => () => {
    setSelectedComponent(cdp, cdp.control.id);
    handleDrawerOpen();
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
                <Grid item xs={w} key={i} className={classes.grid}>
                  <ControlDesignDisplay
                    {...cdp}
                    onFocus={onFocus(cdp, setSelectedComponent)}
                    hasFocus={`${cdp.control.id}` === focussedControlId}
                  />
                </Grid>
              );
            })}
        </Grid>
        {control && (
          <ControlPropsDrawer
            changeControlProp={changeControlProp}
            onClose={handleDrawerClose}
            open={drawerOpen}
            focussedControl={control}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: State) => {
  const {
    selectedControl,
    allControls: { controls }
  } = state;
  return { selectedControl, controls };
};

const mapDispatchToProps = {
  setSelectedComponent,
  changeControlProp: changeControlMetadata
};

const ConnectedFocussableMultiControlDesignDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiControlDesignDisplay);

export default ConnectedFocussableMultiControlDesignDisplay;
