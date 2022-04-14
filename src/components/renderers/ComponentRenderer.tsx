import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { ComponentDesignDisplayProps, Control } from "../../types";
import { HasDelete, HasFocus } from "../Behaviour";
import ControlDesignDisplay from "../ControlDesignDisplay";
import ComponentHeaderRenderer from "./ComponentHeaderRenderer";
import ControlToRendererMapping from "./ControlRenderer";

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
      top: "-8px",
      right: "-16px",
      width: "60px",
      height: "45px",
    },
    toolbar: {
      display: "block",
      position: "absolute",
      top: "-8px",
      right: "-16px",
      width: "60px",
      height: "45px",
    },
  })
);

const ComponentRenderer: React.FC<ComponentDesignDisplayProps & HasFocus & HasDelete> = (
  props: ComponentDesignDisplayProps & HasFocus & HasDelete
) => {
  const { component, metadata, controls, overriden, onFocus, hasFocus, onDelete } = props;
  const { id, name, label, defaultValue, helperText, header, componentType } = component;
  const classes = useStyles();
  const { paper, selectedPaper, wrapper, toolbar, notoolbar } = classes;

  const [over, setOver] = useState(false);
  const onMouseOver = () => setOver(true);
  const onMouseOut = () => setOver(false);
  const {
    dimension: { width },
  } = metadata;

  return (
    <>
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
            {header?.visible && <ComponentHeaderRenderer {...header} />}
            {
              <Grid container spacing={3}>
                {controls.map((c: Control, i: number) => (
                  <ControlDesignDisplay component={component} control={c}>
                    <ControlToRendererMapping control={c} key={i} component={component} />
                  </ControlDesignDisplay>
                ))}
              </Grid>
            }
          </div>
        </Paper>{" "}
      </Grid>
    </>
  );
};

export default ComponentRenderer;
