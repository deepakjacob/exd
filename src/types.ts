import { LabelProps } from "./components/renderers/LabelRenderer";
import { EntryFieldProps } from "./components/renderers/EntryFieldRenderer";

export enum DesignControlType {
  LABEL,
  ENTRY_FIELD,
  COMPOSITE,
  FORM,
  LIST,
  GRID
}

enum DesignControlRendererType {
  ENTRY_FIELD_DESIGN_RENDERER,
  LABEL_DESIGN_RENDERER,
  COMPOSITE_DESIGN_RENDERER,
  FORM_DESIGN_RENDERER,
  LIST__DESIGN_RENDERER,
  GRID_DESIGN_RENDERER
}

export interface ControlProps {
  id: string;
  designControlType: DesignControlType;
}

export type ControlMetadataProps = LabelProps | EntryFieldProps;

export interface ControlDesignDisplayProps {
  control: ControlProps;
  metadata: ControlMetadataProps;
}
