import { ComponentDesignDisplayProps, ControlType } from "./types";
import uuid from "./uuid";

const definitionRegistry = new Map<ControlType, () => ComponentDesignDisplayProps>();

const registerDefinition = (type: ControlType, definition: () => ComponentDesignDisplayProps) =>
  definitionRegistry.set(type, definition);

const getDefinition = (type: ControlType): (() => ComponentDesignDisplayProps) | undefined =>
  definitionRegistry.get(type);

export const getDefinitions = () => Array.from(definitionRegistry.values());

const getFormComponentDefinition = () => {};
// registerDefinition(ControlType.TEXT, getFormComponentDefinition);
// registerDefinition(ControlType.LABEL, getLabelComponentDefinition);
