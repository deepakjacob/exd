import { ControlDesignDisplayProps, DesignControlType } from './types';
import uuid from './uuid';

const definitionRegistry = new Map<DesignControlType, () => ControlDesignDisplayProps>();

export const registerDefinition = (type: DesignControlType, definition: () => ControlDesignDisplayProps) =>
  definitionRegistry.set(type, definition);

export const getDefinition = (type: DesignControlType): (() => ControlDesignDisplayProps) | undefined =>
  definitionRegistry.get(type);

export const getNewEntryFieldDefinition = (): ControlDesignDisplayProps => ({
  control: {
    id: uuid("ENTRY_FIELD_CONTROL_ID_"),
    designControlType: DesignControlType.ENTRY_FIELD
  },
  metadata: {
    id: uuid("entry_field_id_"),
    name: uuid("entry_field_name_"),
    label: "Entry Field Label",
    defaultValue: "Hello World",
    helperText: "This is some addtional info"
  }
});

export const getNewLabelDefinition = (): ControlDesignDisplayProps => ({
  control: {
    id: uuid("LABEL_CONTROL_ID_"),
    designControlType: DesignControlType.LABEL
  },
  metadata: {
    id: uuid("label_field_id_"),
    name: uuid("label_field_name_")
  }
});
registerDefinition(DesignControlType.ENTRY_FIELD, getNewEntryFieldDefinition);
registerDefinition(DesignControlType.LABEL, getNewLabelDefinition);
