import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  //getTenant,
  sayHello
} from "../store/actions/toolbar";
import NewControlDialog from "./NewControlDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: 60
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    paper: {
      width: "80%",
      maxHeight: 435
    }
  })
);

interface BarProps {
  // getTenant: typeof getTenant;
  sayHello: typeof sayHello;
}

const Bar: React.FC<BarProps> = (props: BarProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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

  return (
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
      </Toolbar>
      <NewControlDialog
        classes={{
          paper: classes.paper
        }}
        id="new-control-dialog"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </AppBar>
  );
};

export default Bar;
