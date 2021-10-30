import React from 'react';
import {
  LibraryBooks as ReportsIcon,
  Create as NotesIcon,
  Search as ScoutsIcon,
} from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core';
import { AppNumber } from './AppNumber';

export const AppNumbers = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AppNumber count={185} title="Raportów" icon={<ReportsIcon />} />
      <div className={classes.divider} />
      <AppNumber count={600} title="Notatek" icon={<NotesIcon />} />
      <div className={classes.divider} />
      <AppNumber count={14} title="Skautów" icon={<ScoutsIcon />} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  divider: {
    width: 2,
    height: 50,
    background: theme.palette.primary.contrastText,

    [theme.breakpoints.down('sm')]: {
      height: 2,
      width: '50%',
    },
  },
}));
