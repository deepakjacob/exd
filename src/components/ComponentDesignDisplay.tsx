import { grey } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC, useState } from "react";
import { ComponentDesignDisplayProps as ComponentDesignRendererProps } from "../types";
import { HasDelete, HasFocus } from "./Behaviour";
import ComponentRenderer from "./renderers/ComponentRenderer";

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

const ComponentDesignDisplay: FC<ComponentDesignRendererProps & HasFocus & HasDelete> = (
  props: ComponentDesignRendererProps & HasFocus & HasDelete
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
      <ComponentRenderer {...props} />;
    </Paper>
  );
};

export default ComponentDesignDisplay;
