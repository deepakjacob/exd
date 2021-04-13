import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { ComponentDesignDisplayProps } from '../../types';
import FieldControlToRendererMapping from './FieldRenderers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginTop: "10px",
    },
    title: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  })
);

const EntryFieldRenderer: React.FC<ComponentDesignDisplayProps> = (props: ComponentDesignDisplayProps) => {
  const { component, metadata, fields, overriden } = props;
  const { id, name, label, defaultValue, helperText } = component;
  const classes = useStyles();
  return (
    <>
      <Typography component="h3">Address</Typography>
      <Divider className={classes.title} />
      <Grid container spacing={3}>
        {fields.map((f, idx) => (
          <FieldControlToRendererMapping field={f} key={idx} {...props} />
        ))}
      </Grid>
    </>
  );
};

export default EntryFieldRenderer;
