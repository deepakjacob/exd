import React from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import MultiControlDesignDisplay, {
    MultiControlDesignDisplayProps
} from '../components/MultiControlDesignDisplay';
import WithAppBar from '../hocs/WithAppBar';
import { DesignControlType } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface ViewProps {}

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MultiControlDesignDisplay />
    </Box>
  );
};

export default WithAppBar(View);
