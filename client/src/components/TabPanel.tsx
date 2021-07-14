import * as React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';

export const TabPanel: React.FC<{ index: any; value: any; title: string }> = ({
  children,
  value,
  index,
  title,
}) => {
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${title}-${index}`}
      aria-labelledby={`${title}-${index}`}
    >
      {value === index && <Box className={classes.box}>{children}</Box>}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2)}px 0`,
    },
  },
}));
