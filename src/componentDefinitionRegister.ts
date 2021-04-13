import { ComponentDesignDisplayProps, DesignComponentType, FieldType } from './types';
import uuid from './uuid';

const definitionRegistry = new Map<DesignComponentType, () => ComponentDesignDisplayProps>();

export const registerDefinition = (type: DesignComponentType, definition: () => ComponentDesignDisplayProps) =>
  definitionRegistry.set(type, definition);

export const getDefinition = (type: DesignComponentType): (() => ComponentDesignDisplayProps) | undefined =>
  definitionRegistry.get(type);

export const getDefinitions = () => Array.from(definitionRegistry.values());

export const getNewEntryFieldDefinition = (): ComponentDesignDisplayProps => ({
  component: {
    id: uuid("ENTRY_FIELD_CONTROL_ID_"),
    icon: "Label",
    name: uuid("ENTRY_FIELD_CONTROL_NAME_"),
    designComponentType: DesignComponentType.ENTRY_FIELD,
    label: "Address",
    defaultValue: "Hello World",
    helperText: "This is some addtional info",
  },
  metadata: {
    dimension: {
      width: 12,
    },
  },
  fields: [
    {
      control: {
        id: uuid("label_field_id_"),
        name: uuid("label_field_name_"),
        label: "Address Form",
        defaultValue: "Hello World",
        helperText: "This is some addtional info",
        type: FieldType.LABEL,
      },
      metadata: {
        dimension: {
          width: 12,
        },
      },
    },
    {
      control: {
        id: uuid("entry_field_id_"),
        name: uuid("entry_field_name_"),
        label: "Entry Field Label",
        defaultValue: "Hello World",
        helperText: "This is some addtional info",
        type: FieldType.TEXT,
      },
      metadata: {
        dimension: {
          width: 4,
        },
      },
    },
    {
      control: {
        id: uuid("entry_field_id_"),
        name: uuid("entry_field_name_"),
        label: "Entry Field Label",
        defaultValue: "Hello World",
        helperText: "This is some addtional info",
        type: FieldType.TEXT,
      },
      metadata: {
        dimension: {
          width: 8,
        },
      },
    },
    {
      control: {
        id: uuid("entry_field_id_"),
        name: uuid("entry_field_name_"),
        label: "Entry Field Label",
        defaultValue: "Hello World",
        helperText: "This is some addtional info",
        type: FieldType.SELECT,
        dataSourceRef: {
          GET: "getSelectOptions",
        },
      },
      metadata: {
        dimension: {
          width: 8,
        },
      },
    },
  ],
});

export const getNewLabelDefinition = (): ComponentDesignDisplayProps => ({
  component: {
    id: uuid("LABEL_CONTROL_ID_"),
    icon: "Label",
    name: uuid("LABEL_CONTROL_NAME_"),
    designComponentType: DesignComponentType.LABEL,
    label: "Entry Field Label",
    defaultValue: "Hello World",
    helperText: "This is some addtional info",
  },
  metadata: {
    dimension: {
      width: 4,
    },
  },
  fields: [
    {
      control: {
        id: uuid("label_field_id_"),
        name: uuid("label_field_name_"),
        label: "Entry Field Label",
        defaultValue: "Hello World",
        helperText: "This is some addtional info",
        type: FieldType.LABEL,
      },
      metadata: {
        dimension: {
          width: 12,
        },
      },
    },
  ],
});
registerDefinition(DesignComponentType.ENTRY_FIELD, getNewEntryFieldDefinition);
registerDefinition(DesignComponentType.LABEL, getNewLabelDefinition);
