import React from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import MultiControlDesignDisplay, {
    MultiControlDesignDisplayProps
} from '../components/MultiControlDesignDisplay';
import WithAppBar from '../hocs/WithAppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const throwAwayProps: MultiControlDesignDisplayProps = {
  controlDesignProps: [
    {
      control: {
        id: "LABEL_CONTROL_ID",
        designControlType: DesignControlType.LABEL
      },
      metadata: {
        id: "someLabelId",
        name: "someLabelName"
      }
    },
    {
      control: {
        id: "ENTRY_FIELD_CONTROL_ID",
        designControlType: DesignControlType.ENTRY_FIELD
      },
      metadata: {
        id: "someEntryFieldId",
        name: "someEntryFieldName",
        label: "Entry Field Label",
        defaultValue: "Hello World",
        helperText: "This is some addtional info"
      }
    },
    {
      control: {
        id: "LABEL_CONTROL_ID_2",
        designControlType: DesignControlType.LABEL
      },
      metadata: {
        id: "someLabelId2",
        name: "someLabelName2"
      }
    }
  ]
};

interface ViewProps {}

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MultiControlDesignDisplay {...throwAwayProps} />
    </Box>
  );
};

export default WithAppBar(View);
