import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Field, FieldType } from '../../types';

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
    default:
      return null;
  }
};

export default FieldControlToRendererMapping;
