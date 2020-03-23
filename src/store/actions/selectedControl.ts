import { FluxStandardAction } from 'redux-promise-middleware';

import { ControlDesignDisplayProps } from '../../types';

export const SELECT_RENDERED_CONTROL = "SELECT_RENDERED_CONTROL";

export const setSelectedComponent = (
  control: ControlDesignDisplayProps,
  focussedControlId: string
): FluxStandardAction => ({
  type: SELECT_RENDERED_CONTROL,
  payload: { control, focussedControlId }
});
