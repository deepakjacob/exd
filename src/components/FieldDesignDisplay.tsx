import { createStyles, IconButton, makeStyles, Paper, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { setSelectedComponent, setSelectedField } from "../store/actions/selections";
import { State } from "../store/configureStore";
import { Field, FieldDesignDisplayProps } from "../types";

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

interface ConnectedFieldDesignDisplayProps {
  focussedFieldId?: string;
  setSelectedField: any;
  setSelectedComponent: any
}

const FDDisplay: FC<FieldDesignDisplayProps & ConnectedFieldDesignDisplayProps> = (
  props: FieldDesignDisplayProps & ConnectedFieldDesignDisplayProps
) => {
  const classes = useStyles();
  const { paper, selectedPaper, toolbar, notoolbar } = classes;
  const { component, field, focussedFieldId, setSelectedField, setSelectedComponent } = props;
  const [over, setOver] = useState(false);
  const onMouseOver = () => setOver(true);
  const onMouseOut = () => setOver(false);
  const {
    dimension: { width },
  } = field.metadata;

  const onFocus = (field: Field) => (e: any) => {
    if (focussedFieldId !== field.control.id) {
      setSelectedField(field.control.id);
    }
  }

  const onDelete = () => { }
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

const mapStateToProps = (state: State) => {
  const { selections: { focussedComponentId, focussedFieldId } } = state;
  return { focussedComponentId, focussedFieldId };
};

const mapDispatchToProps = {
  setSelectedField,
  setSelectedComponent
};

const FieldDesignDisplay = connect(mapStateToProps, mapDispatchToProps)(FDDisplay);

export default FieldDesignDisplay;
