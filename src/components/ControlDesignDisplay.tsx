import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ControlDesignDisplayProps, DesignControlType } from '../types';
import EntryFieldRenderer, { EntryFieldProps } from './renderers/EntryFieldRenderer';
import LabelRenderer, { LabelProps } from './renderers/LabelRenderer';

const designControlToRendererMapping = (props: ControlDesignDisplayProps) => {
  const {
    control: { designControlType },
    metadata
  } = props;
  switch (designControlType) {
    case DesignControlType.LABEL:
      // move the below line from ControlRendererRegistration,
      // where the key will be DesignControlRendererType.LABEL_DESIGN_RENDERER
      return <LabelRenderer {...metadata} />;
    case DesignControlType.ENTRY_FIELD:
      // move the below line from ControlRendererRegistration,
      // where the key will be DesignControlRendererType.LABEL_DESIGN_RENDERER
      return <EntryFieldRenderer {...(metadata as EntryFieldProps)} />;
    default:
      throw new Error(`No renderer supported for control type ${designControlType}`);
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },

    paper: {
      border: "2px dotted",
      padding: theme.spacing(2)
    },
    selectedPaper: {
      padding: theme.spacing(2),
      border: `2px solid ${theme.palette.primary.main}`
    }
  })
);

interface IsFocussable {
  hasFocus: boolean;
  onFocus: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

const ControlDesignDisplay: React.FC<ControlDesignDisplayProps & IsFocussable> = (
  props: ControlDesignDisplayProps & IsFocussable
) => {
  const classes = useStyles();
  const { paper, selectedPaper } = classes;
  const { onFocus, hasFocus } = props;
  // move the below line from ControlRendererRegistration,
  // where the key will be DesignControlRendererType.LABEL_DESIGN_RENDERER
  const componentToBeRendered = designControlToRendererMapping(props);

  return (
    <Paper className={hasFocus ? selectedPaper : paper} onClick={onFocus}>
      {componentToBeRendered}
    </Paper>
  );
};

export default ControlDesignDisplay;
