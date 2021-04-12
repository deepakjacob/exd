import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import ConnectedPropsDrawer from '../components/ControlPropsDrawer';
import MultiControlDesignDisplay from '../components/MultiControlDesignDisplay';
import { deleteControl, getAppState, saveAppState } from '../store/actions/allControls';
import { setSelectedComponent } from '../store/actions/selectedControl';
import { State } from '../store/configureStore';

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
        <MultiControlDesignDisplay {...props} />
      </Suspense>
    );
  }
}


const mapStateToProps = (state: State) => {
  const {
    selectedControl: { focussedControlId },
    allControls,
  } = state;
  const { controls } = allControls;
  return { focussedControlId, controls, state };
};

const mapDispatchToProps = {
  getAppState,
  setSelectedComponent,
  deleteControl,
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
      <ConnectedPropsDrawer />
    </Box>
  );
};

export default View;
