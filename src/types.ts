import { AsyncAction, FluxStandardAction } from "redux-promise-middleware";

export enum DraggableType {
  COMPONENT = "COMPONENT",
}

// todo: we need to map control rederer type into a map
// and then lookup from map in control to renderer mapping
enum ControlRendererType {
  TEXT_DESIGN_RENDERER,
  LABEL_DESIGN_RENDERER,
  COMPOSITE_DESIGN_RENDERER,
  FORM_DESIGN_RENDERER,
  LIST__DESIGN_RENDERER,
  GRID_DESIGN_RENDERER,
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
  componentType: ControlType;
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
export interface Api {}

export interface GridPosition {
  row: number;
  col: number;
}
export interface ComponentMetadataProps {
  dimension: Dimension;
}

export interface Control {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  helperText?: string;
  type: ControlType;
  dataSource?: DataSource;
  metadata: ControlMetadata;
  overriden?: ControlMetadata;
}

export interface ControlMetadata {
  dimension: Dimension;
}

export interface ComponentDesignDisplayProps {
  component: ComponentProps;
  metadata: ComponentMetadataProps;
  controls: Control[];
  overriden?: ComponentMetadataProps;
  gridPosition?: GridPosition;
}

export interface ControlDesignDisplayProps {
  children: any;
  control: Control;
  component: ComponentProps;
}

export enum DataSourceType {
  LOCAL = "LOCAL",
  API = "api",
}

interface DataSource {
  //id is a string that needs to be referred from the component
  id: string;
  // fetch data from a local json object or from a remote api which
  // conforms the DataSource spec - which needs to be defined
  type: DataSourceType;

  api: Api;
}

// expectation is that column title/ data type will be taken
// from the associated datasource and dataSource will provide
// customization / decorators through functions

// can column render multiple components / controls
// if the above is true; then how datasources will work

// currently the design allows multiple data sources to be passed in a map
// we need to check the possibility of passing in a function for datasource
// as functions can cater to a wide variety of cases
export interface Column {
  // dataSource: DataSource | { [key: string]: DataSource };
  component: ComponentProps;
}

export interface Action {}

export interface Filter {}

export interface DataTableDesignDisplayProps {
  component: ComponentProps;
  id: string;
  dataSource?: DataSource;
  filters?: Filter[];
  actions?: Action[];
}

// when selection happens af the datatable we need to column and column id
// current thinking is that @see{ComponentDesignDisplayProps} cannot be used
// for DataTable's functioning as it may make a lot of props optional and
// create confusion on the props usage
export interface ConnectedDataTableDesignDisplayProps {
  focussedControlId?: string;
  focussedDataTableColumnId?: string;
  focussedComponentId?: string;
  // todo: fix type information
  setSelectedDataTableColumn?: any;
}

interface Selection {
  type?: ControlType;
}

export interface DataTableSelection extends Selection {
  focussedControlId: string;
  // todo: split into DataTableColumnSelection
  focussedDataTableColumnId?: string;
  focussedComponentId?: string;
  isHeaderSelected?: boolean;
}
export interface ComponentSelection extends Selection {
  focussedComponentId: string;
}
export interface ControlSelection extends Selection {
  focussedComponentId: string;
  focussedControlId: string;
}

export interface SelectionState {
  info?: ComponentSelection | ControlSelection;
}

// need to know what type of component is selected to provide
// customized handling

export enum ControlType {
  DATA_TABLE = "DATA_TABLE",
  DATA_TABLE_COLUMN = "DATA_TABLE_COLUMN",
  FORM = "FORM",
  GENERIC = "GENERIC",
  LABEL = "LABEL",
  TEXT = "TEXT",
  SELECT = "SELECT",
  COMPOSITE = "COMPOSITE",
}

export enum FormControlType {
  LABEL = "LABEL",
  TEXT = "TEXT",
  SELECT = "SELECT",
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
