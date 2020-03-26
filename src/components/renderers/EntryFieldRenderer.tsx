import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { CommonControlProps } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: "10px"
    },
    title: {
      marginTop: "10px",
      marginBottom: "10px"
    }
  })
);

export interface EntryFieldProps extends CommonControlProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  helperText?: string;
}

const EntryFieldRenderer: React.FC<EntryFieldProps> = (props: EntryFieldProps) => {
  const { id, name, label, defaultValue, helperText } = props;
  const classes = useStyles();
  return (
    <>
      <Typography component="h3">Address</Typography>
      <Divider className={classes.title} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name={name}
            disabled={true}
            error={false}
            id={id}
            label={label}
            defaultValue={defaultValue}
            helperText={helperText}
            variant="filled"
            fullWidth={true}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="x"
            disabled={true}
            error={false}
            id="y"
            label={label}
            defaultValue={defaultValue}
            helperText={helperText}
            variant="filled"
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EntryFieldRenderer;
