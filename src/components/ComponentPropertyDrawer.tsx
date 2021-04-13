import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeComponentMetadata as changeComponentMetadata, changeComponentMetadata as changeComponentProp } from '../store/actions/allComponents';
import { State } from '../store/configureStore';
import { getSelectedComponent } from '../store/reducers/allComponents';
import { ComponentDesignDisplayProps, Field } from '../types';

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
  focussedField?: Field;
  changeComponentProp?: typeof changeComponentProp;
}

const ComponentPropertyDrawer = (props: ConnectedPropertyDrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(props.focussedComponent !== undefined), [props.focussedComponent]);

  const onClose = () => {
    setOpen(false);
  }

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
              {props.focussedField?.control.id}
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
    selections: { focussedComponentId, focussedFieldId },
    allComponents: allComponents,
  } = state;
  const filteredComponent = focussedComponentId ? getSelectedComponent(allComponents, focussedComponentId) : undefined;
  const focussedComponent = filteredComponent && filteredComponent.length > 0 ? filteredComponent[0] : undefined;
  const filteredField = focussedFieldId && focussedComponent?.fields.filter((f) => f.control.id === focussedFieldId);
  const focussedField = (filteredField && filteredField.length > 0) ? filteredField[0] : undefined;
  return { focussedComponent, focussedField };
};

const mapDispatchToProps = {
  changeComponentProp: changeComponentMetadata,
};

const ConnectedPropsDrawer = connect(mapStateToProps, mapDispatchToProps)(ComponentPropertyDrawer);

export default ConnectedPropsDrawer;
