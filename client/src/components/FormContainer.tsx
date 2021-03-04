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
    margin: theme.spacing(0, 'auto', 2),

    '& > * + *': {
      marginTop: theme.spacing(2),
    },

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
}));
