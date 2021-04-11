import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { FC } from 'react';
import { Field, FieldType } from '../../types';
import FieldDesignDisplay from '../FieldDesignDisplay';

const FieldLabelRenderer: FC<Field> = (props: Field) => {
  const { control, metadata, overriden } = props;
  const {
    dimension: { width },
  } = metadata;
  return (
    <Grid item xs={width as any}>
      <div>A label is rendered</div>
    </Grid>
  );
};

const FieldTextRenderer: FC<Field> = (props: Field) => {
  const { control, metadata, overriden } = props;
  const {
    dimension: { width },
  } = metadata;
  const { id, name, label, defaultValue, helperText } = control;
  return (
    <Grid item xs={width as any}>
      <FieldDesignDisplay {...props} onFocus={() => { }} onDelete={() => { }} hasFocus={true}>
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
      </FieldDesignDisplay>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
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
  const {
    dimension: { width },
  } = metadata;
  const { id, name, label, defaultValue, helperText } = control;
  return (
    <Grid item xs={width as any}>
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
  const { field, ...rest } = props;

  const { control, metadata, overriden } = field;
  switch (control.type) {
    case FieldType.LABEL:
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
