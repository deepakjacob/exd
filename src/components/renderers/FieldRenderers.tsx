import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Field, FieldType } from "../../types";
import FormControl from "@material-ui/core/FormControl";

const FieldLabelRenderer: FC<Field> = (props: Field) => {
  const { control, metadata, overriden } = props;
  const {
    dimension: { width }
  } = metadata;
  return (
    <Grid item xs={width}>
      <div>A label is rendered</div>
    </Grid>
  );
};

const FieldTextRenderer: FC<Field> = (props: Field) => {
  const { control, metadata, overriden } = props;
  const {
    dimension: { width }
  } = metadata;
  const { id, name, label, defaultValue, helperText } = control;
  return (
    <Grid item xs={width}>
      <TextField
        name={name}
        disabled={true}
        error={false}
        id={id}
        label={label}
        defaultValue={defaultValue}
        helperText={helperText}
        variant="filled"
        fullWidth
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const FieldSelectRenderer: FC<Field> = (props: Field) => {
  const classes = useStyles();

  const { control, metadata, overriden } = props;
  const {
    dimension: { width }
  } = metadata;
  const { id, name, label, defaultValue, helperText } = control;
  return (
    <Grid item xs={width}>
      <FormControl className={classes.formControl} disabled>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>

        <Select labelId="demo-simple-select-label" id="demo-simple-select">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

const FieldControlToRendererMapping: FC<any> = (props: any) => {
  const { control, metadata, overriden } = props.field;
  switch (control.type) {
    case FieldType.LABEL:
      // move the below line from ControlRendererRegistration,
      // where the key will be DesignControlRendererType.LABEL_DESIGN_RENDERER
      return <FieldLabelRenderer {...props.field} />;
    case FieldType.TEXT:
      // move the below line from ControlRendererRegistration,
      // where the key will be DesignControlRendererType.LABEL_DESIGN_RENDERER
      return <FieldTextRenderer {...props.field} />;
    case FieldType.SELECT:
      return <FieldSelectRenderer {...props.field} />;
    default:
      return null;
  }
};

export default FieldControlToRendererMapping;
