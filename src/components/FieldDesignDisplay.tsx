import { createStyles, IconButton, makeStyles, Paper, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { FC, useState } from "react";
import { FieldDesignDisplayProps } from "../types";
import { HasDelete, HasFocus } from "./Behaviour";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    paper: {
      border: "1px dotted",
      padding: theme.spacing(2),
      position: "relative",
      margin: "3px",
    },
    selectedPaper: {
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.primary.main}`,
      position: "relative",
      margin: "3px",
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

const FieldDesignDisplay: FC<FieldDesignDisplayProps & HasFocus & HasDelete> = (
  props: FieldDesignDisplayProps & HasFocus & HasDelete
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
          <DeleteIcon style={{ color: grey[600] }} />
        </IconButton>
      </div>

      { props.children}
    </Paper>
  );
};

export default FieldDesignDisplay;
