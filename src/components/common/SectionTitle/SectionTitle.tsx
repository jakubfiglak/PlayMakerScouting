import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const SectionTitle: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography variant="h2" className={classes.heading}>
      {children}
    </Typography>
  );
};

export default SectionTitle;
