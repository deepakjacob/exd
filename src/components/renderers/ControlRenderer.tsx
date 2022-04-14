import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { FC } from "react";
import { Control, ControlType } from "../../types";
import ControlDataTableRenderer from "./ControlDataTableRenderer";

const ControlLabelRenderer: FC<Control> = (props: Control) => {
  const { metadata, overriden } = props;
  return <div>A label is rendered</div>;
};

const ControlTextRenderer: FC<Control> = (props: Control) => {
  const { id, name, label, defaultValue, helperText, metadata, overriden } = props;

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

const ControlSelectRenderer: FC<Control> = (props: Control) => {
  const classes = useStyles();
  const { id, name, label, defaultValue, helperText, metadata, overriden } = props;
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

const ControlToRendererMapping: FC<any> = (props: any) => {
  const { control, ...rest } = props;

  const { metadata, overriden } = control;
  switch (control.type) {
    case ControlType.LABEL:
      return <ControlLabelRenderer {...props.control} />;
    case ControlType.TEXT:
      // move the below line from ComponentRendererRegistration,
      // where the key will be DesignComponentRendererType.LABEL_DESIGN_RENDERER
      return <ControlTextRenderer {...props.control} />;
    case ControlType.SELECT:
      return <ControlSelectRenderer {...props.control} />;
    case ControlType.DATA_TABLE:
      return <ControlDataTableRenderer {...props.control} component={props.component} />;
    default:
      return null;
  }
};

export default ControlToRendererMapping;
