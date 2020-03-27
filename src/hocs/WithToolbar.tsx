import React from 'react';

import { Grid } from '@material-ui/core';

interface WithToolbarProps {}

const WithToolbar = <P extends any>(Component: React.ComponentType<P>): React.FC<P & WithToolbarProps> => ({
  ...props
}: WithToolbarProps) => (
  <>
    <Grid container>
      <Grid item xs={12}>
        <div {...(props as P)}>Hello</div>
      </Grid>
      <Grid item xs={12}>
        <Component {...(props as P)} />
      </Grid>
    </Grid>
  </>
);

export default WithToolbar;
