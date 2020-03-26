import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { changeControlMetadata } from '../store/actions/allControls';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "15%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  })
);

interface ControlledExpansionPanelProps {
  changeControlProp: typeof changeControlMetadata;
  focussedControl: any;
}

export const ControlledExpansionPanel: React.FC<ControlledExpansionPanelProps> = (
  props: ControlledExpansionPanelProps
) => {
  const classes = useStyles();
  const { focussedControl, changeControlProp } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      return changeControlProp(focussedControl, { dimension: { width: event.target.value } });
    }
  };
  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className={classes.heading}>Dimensions</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="standard-helperText_drawer_dimesion_width"
                label="Width"
                defaultValue="4"
                helperText="Width of the control"
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ControlledExpansionPanel;
