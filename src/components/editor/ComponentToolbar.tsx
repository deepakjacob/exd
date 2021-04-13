import { common } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import React, { FC } from 'react';
import DraggableComponentList from './DraggableComponentList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    expandToolbar: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    collapseToolbar: {
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
    paper: {
      backgroundColor: theme.palette.primary.dark,
      color: "#f5f5f5",
    },
  })
);

interface ToolbarProps {
  open: boolean;
  handleToolbarCollapse: any;
}

const Toolbar: FC<ToolbarProps> = ({ open, handleToolbarCollapse: handleToolbarCollapse }: ToolbarProps) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.toolbar, {
        [classes.expandToolbar]: open,
        [classes.collapseToolbar]: !open,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.expandToolbar]: open,
          [classes.collapseToolbar]: !open,
        }),
      }}
    >
      <div>
        <IconButton onClick={handleToolbarCollapse} style={{ color: common.white }}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <DraggableComponentList />
    </Drawer>
  );
};
export default Toolbar;
