import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { setSelectedFormControl } from "../store/actions/selections";
import { Control, ControlDesignDisplayProps, ControlSelection, ControlType, FormControlType, State } from "../types";

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
      border: `1px solid green`,
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

interface ConnectedControlDesignDisplayProps {
  focussedControlId?: string;
  setSelectedFormControl: any;
}

const FDDisplay: FC<ControlDesignDisplayProps & ConnectedControlDesignDisplayProps> = (
  props: ControlDesignDisplayProps & ConnectedControlDesignDisplayProps
) => {
  const { component, control, focussedControlId, setSelectedFormControl } = props;
  const [over, setOver] = useState(false);
  const onControlMouseOver = () => setOver(true);
  const onControlMouseOut = () => setOver(false);
  const {
    dimension: { width },
  } = control.metadata;

  const onControlFocus = (control: Control) => (e: any) => {
    e.preventDefault();
    if (focussedControlId !== control.id) {
      setSelectedFormControl({
        controlType: control.type,
        focussedComponentId: component.id,
        focussedControlId: control.id,
      });
    }
    e.stopPropagation();
  };

  const onControlDelete = () => {
    // todo: delete the selected control
  };
  const hasFocus = control.id === focussedControlId;

  const classes = useStyles();
  const { toolbar, notoolbar, paper, selectedPaper } = classes;
  return (
    <Grid item xs={width as any}>
      <div
        onMouseOver={onControlMouseOver}
        onMouseOut={onControlMouseOut}
        onClick={onControlFocus(control)}
        className={hasFocus ? selectedPaper : paper}
      >
        <div className={over ? toolbar : notoolbar}>
          <IconButton aria-label="delete" onClick={onControlDelete}>
            <DeleteIcon style={{ color: grey[600] }} />
          </IconButton>
        </div>
        {props.children}
      </div>
    </Grid>
  );
};

const mapStateToProps = (state: State): ControlSelection => {
  const {
    selections: { info },
  } = state;
  const focussedComponentId = (info as ControlSelection)?.focussedComponentId;
  const focussedControlId = (info as ControlSelection)?.focussedControlId;
  return { focussedComponentId, focussedControlId };
};

const mapDispatchToProps = {
  setSelectedFormControl,
};

const ControlDesignDisplay = connect(mapStateToProps, mapDispatchToProps)(FDDisplay);

export default ControlDesignDisplay;
