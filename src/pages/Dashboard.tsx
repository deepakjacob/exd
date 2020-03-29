import React, { Suspense } from 'react';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import WithAppBar from '../hocs/WithAppBar';
import { getAppState } from '../store/actions/allControls';

const MultiControlDesignDisplay = React.lazy(() => import("../components/MultiControlDesignDisplay"));
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface ViewProps {}

class PrimaryView extends React.Component {
  componentDidMount() {
    const { getAppState } = this.props as any;
    getAppState("bffe3243-32af-41f6-a33d-ec6ef09d79f7");
  }
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MultiControlDesignDisplay />
      </Suspense>
    );
  }
}

const mapDispatchToProps = {
  getAppState
};

const ConnectedPrimaryView = connect(undefined, mapDispatchToProps)(PrimaryView);

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ConnectedPrimaryView />
    </Box>
  );
};

export default WithAppBar(View);
