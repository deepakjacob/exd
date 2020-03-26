import React, { Suspense } from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { changeControlMetadata as changeControlProp } from '../store/actions/allControls';
import { ControlDesignDisplayProps } from '../types';

const CollapsiblePanel = React.lazy(() => import("./CollapsiblePanel"));

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    marginTop: 60,

    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  title: {
    marginLeft: theme.spacing(0),
    padding: theme.spacing(1),
    justifyContent: "flex-start"
  }
}));

export interface ControlPropsDrawerProps {
  open: boolean;
  onClose: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  focussedControl: ControlDesignDisplayProps;
  changeControlProp: typeof changeControlProp;
}

const ControlPropsDrawer = (props: ControlPropsDrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { open, onClose, focussedControl, changeControlProp } = props;
  const { metadata } = focussedControl;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
            {theme.direction === "ltr" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Box className={classes.title}>
            <Typography variant="body1" className={classes.title}>
              {metadata.name}
            </Typography>
          </Box>
        </div>
        <Divider />
        <Suspense fallback={<div />}>
          <CollapsiblePanel changeControlProp={changeControlProp} focussedControl={focussedControl} />
        </Suspense>
      </Drawer>
    </div>
  );
};
export default ControlPropsDrawer;
