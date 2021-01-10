import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export const FormContainer: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
    margin: theme.spacing(0, 'auto', 2),

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
}));
