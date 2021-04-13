
export enum DraggableType {
  COMPONENT = "COMPONENT",
}
//Components type
export enum DesignComponentType {
  LABEL = "LABEL",
  ENTRY_FIELD = "ENTRY_FIELD",
  COMPOSITE = "COMPOSITE",
  FORM = "FORM",
  LIST = "LIST",
  GRID = "GRID",
}

enum DesignComponentRendererType {
  ENTRY_FIELD_DESIGN_RENDERER,
  LABEL_DESIGN_RENDERER,
  COMPOSITE_DESIGN_RENDERER,
  FORM_DESIGN_RENDERER,
  LIST__DESIGN_RENDERER,
  GRID_DESIGN_RENDERER,
}

export enum FieldType {
  TEXT = "TEXT",
  TEXT_AREA = "TEXT_AREA",
  LABEL = "LABEL",
  BUTTON = "BUTTON",
  SELECT = "SELECT",
}

export interface Dimension {
  width: number;
}

export interface ComponentCommonProps {
  dimension: Dimension;
}

export interface ComponentProps {
  id: string;
  icon: "Label" | "Address";
  name: string;
  designComponentType: DesignComponentType;
  label: string;
  defaultValue?: string;
  helperText?: string;
}

export interface SelectComponentProps extends ComponentProps {
  dataSourceRef: DataSourceRef;
}

export interface DataSourceRef {
  GET?: string;
}

export interface GridPosition {
  row: number;
  col: number;
}
export interface ComponentMetadataProps {
  dimension: Dimension;
}

export interface FieldComponent {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  helperText?: string;
  type: FieldType;
  dataSourceRef?: DataSourceRef;
}

export interface FieldMetadata {
  dimension: Dimension;
}

export interface Field {
  component: FieldComponent;
  metadata: FieldMetadata;
  overriden?: FieldMetadata;
}

export interface ComponentDesignDisplayProps {
  component: ComponentProps;
  metadata: ComponentMetadataProps;
  fields: Field[];
  overriden?: ComponentMetadataProps;
  gridPosition?: GridPosition;
}


export interface FieldDesignDisplayProps {
  children: any;
}