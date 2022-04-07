import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { AsyncAction, FluxStandardAction } from "redux-promise-middleware";
import ComponentPropertyDrawer from "../components/ComponentPropertyDrawer";
import MultiComponentDesignDisplay from "../components/MultiComponentDesignDisplay";
import { deleteComponent, getAppState, saveAppState } from "../store/actions/allComponents";
import { setSelectedFormComponent } from "../store/actions/selections";
import {
  ComponentDesignDisplayProps,
  ComponentSelection,
  ComponentSelectionType,
  PrimaryViewDispatchProps,
  PrimaryViewMappedProps,
  PrimaryViewProps,
  State,
} from "../types";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

class PrimaryView extends React.Component<PrimaryViewProps, any> {
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

const mapStateToProps = (state: State): PrimaryViewMappedProps => {
  const {
    selections: { info },
    allComponents,
  } = state;
  const { components } = allComponents;

  if (info?.type === ComponentSelectionType.FORM || info?.type === ComponentSelectionType.FIELD) {
    const focussedComponentId = (info as ComponentSelection).focussedComponentId;
    // todo: either pass allcomponents or components
    return { focussedComponentId, components, allComponents };
  }
  // todo: either pass allcomponents or components
  return { focussedComponentId: undefined, components, allComponents };
};

const mapDispatchToProps: PrimaryViewDispatchProps = {
  getAppState,
  setSelectedFormComponent,
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
