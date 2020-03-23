// enum Color{
//     Red, Green
// }

// To String
// var green: string = Color[Color.Green];

// To Enum / number
// var color : Color = Color[green];

import { ControlDesignDisplayProps, DesignControlType } from './types';

const definitionRegistry = new Map<DesignControlType, ControlDesignDisplayProps>();

export const registerDefinition = (type: DesignControlType, definition: ControlDesignDisplayProps) =>
  definitionRegistry.set(type, definition);

export const getDefinition = (type: DesignControlType) => definitionRegistry.get(type);
