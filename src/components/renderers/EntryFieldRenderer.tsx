import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';

export interface EntryFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  helperText?: string;
}

const EntryFieldRenderer: React.FC<EntryFieldProps> = (props: EntryFieldProps) => {
  const { id, name, label, defaultValue, helperText } = props;
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
    />
  );
};

export default EntryFieldRenderer;
