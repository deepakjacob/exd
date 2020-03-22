import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ControlDesignDisplayProps } from "../types";
import Box from "@material-ui/core/Box";

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
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  }
}));

export interface ControlPropsDrawerProps {
  open: boolean;
  onClose: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  focussedControl: ControlDesignDisplayProps;
}

const ControlPropsDrawer = (props: ControlPropsDrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { open, onClose, focussedControl } = props;
  const { control, metadata } = focussedControl;
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
            <Box></Box>
          </IconButton>
        </div>
        <Divider />
      </Drawer>
    </div>
  );
};
export default ControlPropsDrawer;
