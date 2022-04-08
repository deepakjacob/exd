import { createStyles, IconButton, makeStyles, Paper, Theme } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
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

interface ConnectedFieldDesignDisplayProps {
  focussedFieldId?: string;
  setSelectedFormField: any;
}

const FDDisplay: FC<FieldDesignDisplayProps & ConnectedFieldDesignDisplayProps> = (
  props: FieldDesignDisplayProps & ConnectedFieldDesignDisplayProps
) => {
  const { component, field, focussedFieldId, setSelectedFormField } = props;
  const [over, setOver] = useState(false);
  const onFieldMouseOver = () => setOver(true);
  const onFieldMouseOut = () => setOver(false);
  const {
    dimension: { width },
  } = field.metadata;

  const onFieldFocus = (field: Field) => (e: any) => {
    e.preventDefault();
    if (focussedFieldId !== field.control.id) {
      setSelectedFormField({ focussedComponentId: component.id, focussedFieldId: field.control.id });
    }
    e.stopPropagation();
  };

  const onFieldDelete = () => {};
  const classes = useStyles();
  const { toolbar, notoolbar } = classes;
  return (
    <Grid item xs={width as any}>
      <div onMouseOver={onFieldMouseOver} onMouseOut={onFieldMouseOut} onFocus={onFieldFocus(field)}>
        <div className={over ? toolbar : notoolbar}>
          <IconButton aria-label="delete" onClick={onFieldDelete}>
            <DeleteIcon style={{ color: blue[600] }} />
          </IconButton>
        </div>
        {props.children}
      </div>
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
