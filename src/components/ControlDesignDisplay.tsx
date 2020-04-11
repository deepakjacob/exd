import React, { FC, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import { ControlDesignDisplayProps, DesignControlType } from '../types';
import EntryFieldRenderer from './renderers/EntryFieldRenderer';
import LabelRenderer from './renderers/LabelRenderer';

const DesignMapper: FC<ControlDesignDisplayProps> = (props: ControlDesignDisplayProps) => {
  const {
    control: { designControlType },
  } = props;
  switch (designControlType) {
    case DesignControlType.LABEL:
      return <LabelRenderer {...props} />;
    case DesignControlType.ENTRY_FIELD:
      return <EntryFieldRenderer {...props} />;
    default:
      throw new Error(`No renderer supported for control type ${designControlType}`);
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    paper: {
      border: "2px dotted",
      padding: theme.spacing(2),
      position: "relative",
    },
    selectedPaper: {
      padding: theme.spacing(2),
      border: `2px solid ${theme.palette.primary.main}`,
      position: "relative",
    },
    notoolbar: {
      display: "none",
      position: "absolute",
      top: "5px",
      right: "5px",
      width: "60px",
      height: "45px",
    },
    toolbar: {
      display: "block",
      position: "absolute",
      top: "5px",
      right: "5px",
      width: "60px",
      height: "45px",
    },
  })
);

interface HasFocus {
  hasFocus: boolean;
  onFocus: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

interface HasDelete {
  onDelete: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const ControlDesignDisplay: FC<ControlDesignDisplayProps & HasFocus & HasDelete> = (
  props: ControlDesignDisplayProps & HasFocus & HasDelete
) => {
  const classes = useStyles();
  const { paper, selectedPaper, toolbar, notoolbar } = classes;
  const { onFocus, hasFocus, onDelete } = props;
  const [over, setOver] = useState(false);
  const onMouseOver = () => setOver(true);
  const onMouseOut = () => setOver(false);
  return (
    <Paper
      className={hasFocus ? selectedPaper : paper}
      onClick={onFocus}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div className={over ? toolbar : notoolbar}>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>

      <DesignMapper {...props} />
    </Paper>
  );
};

export default ControlDesignDisplay;
