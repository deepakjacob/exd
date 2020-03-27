import React from 'react';

import AppBar from '../components/AppBar';

interface WithAppBarProps {}

const WithAppBar = <P extends object>(Component: React.ComponentType<P>): React.FC<P & WithAppBarProps> => ({
  ...props
}: WithAppBarProps) => (
  <>
    <AppBar />
    <Component {...(props as P)} />
  </>
);

export default WithAppBar;
