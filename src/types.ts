import { GridSize } from "@material-ui/core/Grid";

export enum DraggableType {
  CONTROL = "CONTROL",
}
//Components type
export enum DesignControlType {
  LABEL = "LABEL",
  ENTRY_FIELD = "ENTRY_FIELD",
  COMPOSITE = "COMPOSITE",
  FORM = "FORM",
  LIST = "LIST",
  GRID = "GRID",
}

enum DesignControlRendererType {
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
  width: GridSize;
}

export interface CommonControlProps {
  dimension: Dimension;
}

export interface ControlProps {
  id: string;
  name: string;
  designControlType: DesignControlType;
  label: string;
  defaultValue?: string;
  helperText?: string;
}

export interface SelectControlProps extends ControlProps {
  dataSourceRef: DataSourceRef;
}

export interface DataSourceRef {
  GET?: string;
}

export interface GridPosition {
  row: number;
  col: number;
}
export interface ControlMetadataProps {
  dimension: Dimension;
}

export interface FieldControl {
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
  control: FieldControl;
  metadata: FieldMetadata;
  overriden?: FieldMetadata;
}

export interface ControlDesignDisplayProps {
  control: ControlProps;
  metadata: ControlMetadataProps;
  fields: Field[];
  overriden?: ControlMetadataProps & GridPosition;
}

export interface ControlItemDisplay {
  id: string;
  type: DesignControlType;
  icon: string;
  title: string;
  subtitle: string;
}
