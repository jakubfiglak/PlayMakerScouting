import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from '../styles';

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
