import { Snackbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { PlayArrow } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import React, { FC } from "react";
import { Playground } from "../playground/Playground";

interface ApplicationBarProps {
  handleDrawerOpen: any;
  saveAppState: any;
  allComponents: any;
  open: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: "260px",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
  })
);

const ApplicationBar: FC<ApplicationBarProps> = ({
  handleDrawerOpen,
  saveAppState,
  open,
  allComponents,
}: ApplicationBarProps) => {
  const classes = useStyles();

  const [play, setPlay] = React.useState(false);

  const handleClickOpen = () => {
    setPlay(true);
  };

  const handleClose = () => {
    setPlay(false);
  };

  const showSomeAlert = (open: boolean) => {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    );
  };
  const toggleAlert = true;
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap className={classes.title}>
            XD
          </Typography>
          <Button color="inherit" onClick={saveAppState}>
            Save
          </Button>
          <Button color="inherit" onClick={(e) => showSomeAlert(toggleAlert)}>
            Delete
          </Button>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <PlayArrow />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Playground
        open={play}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        controls={allComponents.components}
      />
    </div>
  );
};

export default ApplicationBar;
