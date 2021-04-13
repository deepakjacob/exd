import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  const { title, divider } = props;
  const classes = useStyles();
  return (
    <Box>
      <Typography component="h3">{title}</Typography>
      {divider && <Divider className={classes.title} />}
    </Box>
  )
}


const ComponentRenderer: React.FC<ComponentDesignDisplayProps> = (props: ComponentDesignDisplayProps) => {
  const { component, metadata, fields, overriden } = props;
  const { id, name, label, defaultValue, helperText, header } = component;
  const classes = useStyles();
  return (
    <>
      {header && header.visible && <ComponentHeader {...header} />}
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
