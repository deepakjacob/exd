import React, { Suspense } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import { State } from "../store/configureStore";
import { addControl, saveAppState } from "../store/actions/allControls";

const NewControlDialog = React.lazy(() => import("./NewControlDialog"));
const Toolbar = React.lazy(() => import("@material-ui/core/Toolbar"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: 60,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      width: "80%",
      maxHeight: 435,
    },
  })
);

export interface BarProps {
  state: State;
  saveAppState: typeof saveAppState;
  addControl: typeof addControl;
}

const Bar: React.FC<BarProps> = (props: BarProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { state, addControl, saveAppState } = props;
  const showNewControlDialog = () => {
    setOpen(true);
  };

  const addNewTab = () => {};

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const saveState = (state: State) => {
    return saveAppState(state);
  };
  return (
    <>
      <Suspense fallback={<div />}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              XLogin
            </Typography>
            <Button color="inherit" onClick={showNewControlDialog}>
              New Control
            </Button>
            <Button color="inherit" onClick={addNewTab}>
              New Tab
            </Button>
            <Button color="inherit" onClick={(e) => saveState(state)}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </Suspense>

      <Suspense fallback={<div />}>
        <NewControlDialog
          classes={{
            paper: classes.paper,
          }}
          id="new-control-dialog"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          addControl={addControl}
        />
      </Suspense>
    </>
  );
};

const mapStateToProps = (state: State) => ({ state });

const mapDispatchToProps = {
  addControl,
  saveAppState,
};

const ConnectedBar = connect(mapStateToProps, mapDispatchToProps)(Bar);

export default ConnectedBar;
