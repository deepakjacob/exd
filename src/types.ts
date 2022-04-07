import { AsyncAction, FluxStandardAction } from "redux-promise-middleware";

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
  DATA_TABLE = "DATA_TABLE",
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

interface ComponentRuntimeProps {}

export interface ComponentAction {
  id: string;
  icon?: any;
  title: string;
  isPrimaryAction?: boolean;
  size?: "small" | "medium" | "large";
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

// todo: this needs to change
export interface SelectComponentProps extends ComponentProps {
  dataSource: DataSource;
}
// todo: this is madness; don't tie api implementation
// details with component
export interface Api {
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
  dataSourceRef?: DataSource;
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

// when selection happens af the datatable we need to column and column id
// current thinking is that @see{ComponentDesignDisplayProps} cannot be used
// for DataTable's functioning as it may make a lot of props optional and
// create confusion on the props usage
export interface ConnectedDataTableDesignDisplayProps {
  focussedTableId?: string;
  focussedColumnId?: string;
  // todo: fix type information
  setSelectedColumn?: any;
  setSelectedTable?: any;
}
export interface DataSource {}
// expectation is that column title/ data type will be taken
// from the associated datasource and dataSource will provide
// customization / decorators through functions

// can column render multiple components / controls
// if the above is true; then how datasources will work

// currently the design allows multiple data sources to be passed in a map
// we need to check the possibility of passing in a function for datasource
// as functions can cater to a wide variety of cases
export interface Column {
  dataSource: DataSource | { [key: string]: DataSource };
  component: ComponentProps;
}

export interface Action {}

export interface Filter {}

export interface DataTableDesignDisplayProps {
  dataSource?: DataSource;
  metadata: ComponentMetadataProps;
  filters?: Filter[];
  actions?: Action[];
  component: ComponentProps;
  // todo: see weather do we really need column or
  // it can be deduced from datasource
  //columns: Column[];
  overriden?: ComponentMetadataProps;
  gridPosition?: GridPosition;
}

interface Selection {
  type?: ComponentSelectionType;
}

export interface DataTableSelection extends Selection {
  focussedTableId: string;
  // todo: split into DataTableColumnSelection
  focussedColumnId?: string;
  isHeaderSelected?: boolean;
}
export interface ComponentSelection extends Selection {
  focussedComponentId: string;
}
export interface FieldSelection extends Selection {
  focussedComponentId: string;
  focussedFieldId: string;
}

export interface SelectionState {
  info?: ComponentSelection | FieldSelection | DataTableSelection;
}

// need to know what type of component is selected to provide
// customized handling

export enum ComponentSelectionType {
  DATA_TABLE = "DATA_TABLE",
  FORM = "FORM",
  GENERIC = "GENERIC",
  FIELD = "FIELD",
}
export type PrimaryViewProps = PrimaryViewMappedProps & PrimaryViewDispatchProps;

export interface PrimaryViewMappedProps {
  components: ComponentDesignDisplayProps[];
  focussedComponentId: string | undefined;
  allComponents: AllComponentsState;
}

export interface PrimaryViewDispatchProps {
  getAppState: (appStateId: string) => void;
  setSelectedFormComponent: (focussedComponentId: string) => FluxStandardAction;
  deleteComponent: (componentId: string) => FluxStandardAction;
  saveAppState: (state: State) => AsyncAction;
}

export interface State {
  id: string;
  selections: SelectionState;
  allComponents: AllComponentsState;
}

export interface AllComponentsState {
  id: string | undefined;
  components: ComponentDesignDisplayProps[];
}
