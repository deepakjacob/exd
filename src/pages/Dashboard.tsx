import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import ComponentPropertyDrawer from "../components/ComponentPropertyDrawer";
import MultiComponentDesignDisplay from "../components/MultiComponentDesignDisplay";
import { deleteComponent, getAppState, saveAppState } from "../store/actions/allComponents";
import { setSelectedComponent } from "../store/actions/selections";
import { State } from "../store/configureStore";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

class PrimaryView extends React.Component<any, any> {
  componentDidMount() {
    const props = this.props;
    props.getAppState("bffe3243-32af-41f6-a33d-ec6ef09d79f7");
  }
  render() {
    const props = this.props;
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MultiComponentDesignDisplay {...props} />
      </Suspense>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    selections: { focussedComponentId },
    allComponents,
  } = state;
  const { components } = allComponents;
  return { focussedComponentId, components, state };
};

const mapDispatchToProps = {
  getAppState,
  setSelectedComponent,
  deleteComponent,
  saveAppState,
};

const ConnectedPrimaryView = connect(mapStateToProps, mapDispatchToProps)(PrimaryView);

const View: React.FC<any> = (props: any) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <DndProvider backend={Backend}>
        <ConnectedPrimaryView {...props} />
      </DndProvider>
      <ComponentPropertyDrawer />
    </Box>
  );
};

export default View;
