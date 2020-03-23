import React from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345
    },
    boxMargins: {
      margin: 10
    },
    cardMargins: {
      margin: 15
    }
  })
);

interface DashboardCardProps {
  isPending: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = props => {
  const classes = useStyles();

  return <Box className={classes.boxMargins}></Box>;
};

export default DashboardCard;
