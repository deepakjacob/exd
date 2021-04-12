import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { Suspense, useState } from 'react';
import { connect } from 'react-redux';
import { changeControlMetadata, changeControlMetadata as changeControlProp } from '../store/actions/allControls';
import { State } from '../store/configureStore';
import { getSelectedControl } from '../store/reducers/allControls';
import { ControlDesignDisplayProps } from '../types';

const CollapsiblePanel = React.lazy(() => import("./CollapsiblePanel"));

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: 60,

    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  title: {
    marginLeft: theme.spacing(0),
    padding: theme.spacing(1),
    justifyContent: "flex-start",
  },
}));

export interface ControlPropsDrawerProps {
  open: boolean;
  onClose: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  focussedControl: ControlDesignDisplayProps | undefined;
  changeControlProp: typeof changeControlProp;
}

const ControlPropsDrawer = (props: ControlPropsDrawerProps | undefined) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props?.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props?.onClose}>
            {theme.direction === "ltr" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Box className={classes.title}>
            <Typography variant="body1" className={classes.title}>
              {props?.focussedControl?.control.label}
            </Typography>
          </Box>
        </div>
        <Divider />
        <Suspense fallback={<div />}>
          <CollapsiblePanel changeControlProp={changeControlProp} focussedControl={props?.focussedControl} />
        </Suspense>
      </Drawer>
    </div>
  );
};

const PropsDrawer = (props: ControlPropsDrawerProps | undefined) => {
  const [open, setOpen] = useState(props?.focussedControl === undefined);

  const onClose = () => {
    setOpen(false);
  };

  return <div>
    <ControlPropsDrawer
      changeControlProp={changeControlProp}
      onClose={onClose}
      open={open}
      focussedControl={props?.focussedControl}
    />
  </div>
}

const mapStateToProps = (state: State) => {
  const {
    selectedControl: { focussedControlId },
    allControls,
  } = state;
  const filtered = focussedControlId ? getSelectedControl(allControls, focussedControlId) : undefined;
  const focussedControl = filtered && filtered.length > 0 ? filtered[0] : undefined;
  return { focussedControl };
};

const mapDispatchToProps = {
  changeControlProp: changeControlMetadata,
};

const ConnectedPropsDrawer = connect(mapStateToProps, mapDispatchToProps)(PropsDrawer);

export default ConnectedPropsDrawer;
