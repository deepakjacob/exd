import React from "react";
import AppBar, { BarProps } from "../components/AppBar";

const WithAppBar = <P extends object>(Component: React.ComponentType<P>): React.FC<P & BarProps> => ({
  ...props
}: BarProps) => (
  <>
    <AppBar {...props} />
    <Component {...(props as P)} />
  </>
);

export default WithAppBar;
