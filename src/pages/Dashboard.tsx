import React, { Suspense } from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const MultiControlDesignDisplay = React.lazy(() => import("../components/MultiControlDesignDisplay"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <MultiControlDesignDisplay />
      </Suspense>
    </Box>
  );
};

