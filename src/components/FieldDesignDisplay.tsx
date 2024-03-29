import { createStyles, IconButton, makeStyles, Paper, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { setSelectedFormField } from "../store/actions/selections";
import { ComponentSelectionType, Field, FieldDesignDisplayProps, FieldSelection, State } from "../types";

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

interface ConnectedFieldDesignDisplayProps {
  focussedFieldId?: string;
  setSelectedFormField: any;
}

const FDDisplay: FC<FieldDesignDisplayProps & ConnectedFieldDesignDisplayProps> = (
  props: FieldDesignDisplayProps & ConnectedFieldDesignDisplayProps
) => {
  const classes = useStyles();
  const { paper, selectedPaper, toolbar, notoolbar } = classes;
  const { component, field, focussedFieldId, setSelectedFormField } = props;
  const [over, setOver] = useState(false);
  const onMouseOver = () => setOver(true);
  const onMouseOut = () => setOver(false);
  const {
    dimension: { width },
  } = field.metadata;

  const onFocus = (field: Field) => (e: any) => {
    e.preventDefault();
    if (focussedFieldId !== field.control.id) {
      setSelectedFormField({ focussedComponentId: component.id, focussedFieldId: field.control.id });
    }
    e.stopPropagation();
  };

  const onDelete = () => {};
  const hasFocus = field.control.id === focussedFieldId;

  return (
    <Grid item xs={width as any}>
      <Paper
        className={hasFocus ? selectedPaper : paper}
        onClick={onFocus(field)}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <div className={over ? toolbar : notoolbar}>
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon style={{ color: grey[600] }} />
          </IconButton>
        </div>

        {props.children}
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: State): FieldSelection | undefined => {
  const {
    selections: { info },
  } = state;
  if (info?.type === ComponentSelectionType.FIELD) {
    const focussedComponentId = (info as FieldSelection).focussedComponentId;
    const focussedFieldId = (info as FieldSelection).focussedFieldId;
    return { focussedComponentId, focussedFieldId };
  }
  return undefined;
};

const mapDispatchToProps = {
  setSelectedFormField,
};

const FieldDesignDisplay = connect(mapStateToProps, mapDispatchToProps)(FDDisplay);

export default FieldDesignDisplay;
