import React from 'react';

import AppBar from '../components/AppBar';
import { sayHello } from '../store/actions/toolbar';

interface WithAppBarProps {
  // getTenant: typeof getTenant;
  // sayHello: typeof sayHello;
}

const WithAppBar = <P extends object>(Component: React.ComponentType<P>): React.FC<P & WithAppBarProps> => ({
  ...props
}: WithAppBarProps) => (
  <>
    <AppBar
    // getTenant={props.getTenant}
    // sayHello={props.sayHello}
    />
    <Component {...(props as P)} />
  </>
);

export default WithAppBar;
