import React, { FC } from "react";
import { ComponentDesignDisplayProps as ComponentDesignRendererProps } from "../types";
import { HasDelete, HasFocus } from "./Behaviour";
import ComponentRenderer from "./renderers/ComponentRenderer";

const ComponentDesignDisplay: FC<ComponentDesignRendererProps & HasFocus & HasDelete> = (
  props: ComponentDesignRendererProps & HasFocus & HasDelete
) => {
  return <ComponentRenderer {...props} />;
};

export default ComponentDesignDisplay;
