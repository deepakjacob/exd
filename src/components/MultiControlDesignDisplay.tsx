import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import ControlDesignDisplay from "./ControlDesignDisplay";
import { ControlDesignDisplayProps } from "../types";
import ControlPropsDrawer, { ControlPropsDrawerProps } from "./ControlPropsDrawer";
import { connect } from "react-redux";
import { State } from "../store/configureStore";
import { setSelectedComponent } from "../store/actions/control";

export interface MultiControlDesignDisplayProps {
  controlDesignProps: ControlDesignDisplayProps[];
}

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
    }
  })
);

const MultiControlDesignDisplay: React.FC<MultiControlDesignDisplayProps> = (props: MultiControlDesignDisplayProps) => {
  const classes = useStyles();
  const { controlDesignProps, setSelectedComponent, focussedControlId, control } = props as any;
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
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen
      })}
    >
      <Grid container spacing={3}>
        {controlDesignProps.map((cdp: ControlDesignDisplayProps, i: number) => (
          <Grid item xs={12} key={i}>
            <ControlDesignDisplay
              {...cdp}
              onFocus={onFocus(cdp, setSelectedComponent)}
              hasFocus={`${cdp.control.id}` === focussedControlId}
            />
          </Grid>
        ))}
      </Grid>
      {control && <ControlPropsDrawer onClose={handleDrawerClose} open={drawerOpen} focussedControl={control} />}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const { control } = state;
  return control;
};

const mapDispatchToProps = {
  setSelectedComponent
};

const ConnectedFocussableMultiControlDesignDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiControlDesignDisplay);

export default ConnectedFocussableMultiControlDesignDisplay;
