import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { FC } from "react";
import { Field, FieldType } from "../../types";

const FieldLabelRenderer: FC<Field> = (props: Field) => {
  const { control, metadata, overriden } = props;
  return <div>A label is rendered</div>;
};

const FieldTextRenderer: FC<Field> = (props: Field) => {
  const { control, metadata, overriden } = props;
  const { id, name, label, defaultValue, helperText } = control;
  return (
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
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formComponent: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const FieldSelectRenderer: FC<Field> = (props: Field) => {
  const classes = useStyles();
  const { control, metadata, overriden } = props;
  const { id, name, label, defaultValue, helperText } = control;
  return (
    <FormControl className={classes.formComponent} disabled>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>

      <Select labelId="demo-simple-select-label" id="demo-simple-select">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

const FieldControlToRendererMapping: FC<any> = (props: any) => {
  const { field, ...rest } = props;

  const { control, metadata, overriden } = field;
  switch (control.type) {
    case FieldType.LABEL:
      return <FieldLabelRenderer {...props.field} />;
    case FieldType.TEXT:
      // move the below line from ComponentRendererRegistration,
      // where the key will be DesignComponentRendererType.LABEL_DESIGN_RENDERER
      return <FieldTextRenderer {...props.field} />;
    case FieldType.SELECT:
      return <FieldSelectRenderer {...props.field} />;
    default:
      return null;
  }
};

export default FieldControlToRendererMapping;
