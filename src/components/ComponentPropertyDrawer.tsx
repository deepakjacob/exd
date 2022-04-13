import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeComponentMetadata as changeComponentMetadata,
  changeComponentMetadata as changeComponentProp,
} from "../store/actions/allComponents";
import { getSelectedComponent } from "../store/reducers/allComponents";
import {
  AllComponentsState,
  ComponentDesignDisplayProps,
  ComponentSelection,
  Control,
  ControlSelection,
  ControlType,
  DataTableSelection,
  State,
} from "../types";

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

interface ConnectedPropertyDrawerProps {
  focussedComponent?: ComponentDesignDisplayProps;
  focussedControl?: Control;
  changeComponentProp?: typeof changeComponentProp;
}

const ComponentPropertyDrawer = (props: ConnectedPropertyDrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(props.focussedComponent !== undefined), [props.focussedComponent]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
            {theme.direction === "ltr" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Box className={classes.title}>
            <Typography variant="body1" className={classes.title}>
              {props.focussedComponent?.component.label}
            </Typography>
          </Box>
          <Box className={classes.title}>
            <Typography variant="body1" className={classes.title}>
              {props.focussedControl?.id}
            </Typography>
          </Box>
        </div>
        <Divider />
        <Suspense fallback={<div />}>
          <CollapsiblePanel changeComponentProp={changeComponentProp} focussedComponent={props.focussedComponent} />
        </Suspense>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const {
    selections: { info },
    allComponents: allComponents,
  } = state;

  if (info && info.type === ControlType.FORM) {
    const focussedComponent = getFocussedComponent(info as ComponentSelection, allComponents);
    return { focussedComponent, focussedControl: undefined };
  }
  if (info && info.type) {
    const focussedComponent = getFocussedComponent(info as ControlSelection, allComponents);
    const focussedControlId = (info as ControlSelection).focussedControlId;
    const filteredControl =
      focussedControlId && focussedComponent?.controls.filter((control) => control.id === focussedControlId);
    const focussedControl = filteredControl && filteredControl.length > 0 ? filteredControl[0] : undefined;
    return { focussedComponent, focussedControl };
  }
};

const mapDispatchToProps = {
  changeComponentProp: changeComponentMetadata,
};

const ConnectedPropsDrawer = connect(mapStateToProps, mapDispatchToProps)(ComponentPropertyDrawer);

export default ConnectedPropsDrawer;

function getFocussedComponent(info: ComponentSelection | ControlSelection, allComponents: AllComponentsState) {
  const focussedComponentId = info.focussedComponentId;
  const filteredComponent = focussedComponentId ? getSelectedComponent(allComponents, focussedComponentId) : undefined;
  const focussedComponent = filteredComponent && filteredComponent.length > 0 ? filteredComponent[0] : undefined;
  return focussedComponent;
}
