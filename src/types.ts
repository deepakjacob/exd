
export enum DraggableType {
  COMPONENT = "COMPONENT",
}
//Components type
export enum ComponentType {
  LABEL = "LABEL",
  ENTRY_FIELD = "ENTRY_FIELD",
  COMPOSITE = "COMPOSITE",
  FORM = "FORM",
  LIST = "LIST",
  GRID = "GRID",
}

enum ComponentRendererType {
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

interface ComponentRuntimeProps {

}

export interface ComponentAction {
  id: string;
  icon?: any;
  title: string;
  isPrimaryAction?: boolean;
  size?: 'small' | 'medium' | 'large';
  executeFn: (props: ComponentRuntimeProps) => undefined;
}


export interface ComponentHeaderProps {
  visible: boolean;
  title: string;
  divider: boolean;
  actions?: ComponentAction[];
}

export interface ComponentProps {
  header?: ComponentHeaderProps;
  id: string;
  icon: "Label" | "Address";
  name: string;
  componentType: ComponentType;
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

export interface ComponentDesignDisplayProps {
  component: ComponentProps;
  metadata: ComponentMetadataProps;
  fields: Field[];
  overriden?: ComponentMetadataProps;
  gridPosition?: GridPosition;
}


export interface FieldDesignDisplayProps {
  children: any;
  field: Field;
  component: ComponentProps;
}