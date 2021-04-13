import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { ComponentDesignDisplayProps, ComponentHeaderProps } from '../../types';
import FieldDesignDisplay from '../FieldDesignDisplay';
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

const ComponentHeader: React.FC<ComponentHeaderProps> = (props: ComponentHeaderProps) => {
  const { title, divider, actions } = props;
  const classes = useStyles();
  return (
    <Box>
      <Grid container
        direction="row"
        justify="space-between"
        alignItems="center">
        <Grid item xs={10}>
          <Typography component="h3">{title}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container
            direction="row"
            justify="flex-end">
            {actions && actions.map((action) => {
              const color = action.isPrimaryAction ? "primary" : "default"
              return (
                <Grid item>
                  <Button
                    color={color}
                    size="small"
                    startIcon={action.icon ? <SaveIcon /> : null}>
                    {action.title}
                  </Button>
                </Grid>
              );
            })}

          </Grid>
        </Grid>
      </Grid>
      {divider && <Divider className={classes.title} />}
    </Box>
  )
}

const ComponentRenderer: React.FC<ComponentDesignDisplayProps> = (props: ComponentDesignDisplayProps) => {
  const { component, metadata, fields, overriden } = props;
  const { id, name, label, defaultValue, helperText, header } = component;
  return (
    <>
      {header?.visible && <ComponentHeader {...header} />}
      <Grid container spacing={3}>
        {fields.map((f, idx) => (
          <FieldDesignDisplay component={component} field={f}>
            <FieldControlToRendererMapping field={f} key={idx} />
          </FieldDesignDisplay>
        ))}
      </Grid>
    </>
  );
};

export default ComponentRenderer;
