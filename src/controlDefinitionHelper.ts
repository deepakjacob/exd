import { registerDefinition } from './controlDefinitionRegister';
import { DesignControlType } from './types';
import uuid from './uuid';

export const getNewEntryFieldDefinition = () => ({
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

export const getNewLabelDefinition = () => ({
  control: {
    id: uuid("LABEL_CONTROL_ID_"),
    designControlType: DesignControlType.LABEL
  },
  metadata: {
    id: uuid("label_field_id_"),
    name: uuid("label_field_name_")
  }
});

registerDefinition(DesignControlType.ENTRY_FIELD, getNewLabelDefinition());
registerDefinition(DesignControlType.LABEL, getNewLabelDefinition());
