import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
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
    wrapper: {
      padding: theme.spacing(2),
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
  const { paper, selectedPaper, wrapper, toolbar, notoolbar } = classes;
  const { onFocus, hasFocus, onDelete, metadata } = props;
  const [over, setOver] = useState(false);
  const onMouseOver = () => setOver(true);
  const onMouseOut = () => setOver(false);
  const {
    dimension: { width },
  } = metadata;
  return (
    <Grid item xs={width as any}>
      <Paper
        className={hasFocus ? selectedPaper : paper}
        onClick={onFocus}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <div className={wrapper}>
          <div className={over ? toolbar : notoolbar}>
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon style={{ color: grey[600] }} />
            </IconButton>
          </div>
          <ComponentRenderer {...props} />
        </div>
      </Paper>
    </Grid>
  );
};

export default ComponentDesignDisplay;
