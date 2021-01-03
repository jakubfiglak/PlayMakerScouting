import React, { FC } from 'react';
import {
  CssBaseline,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import Sidebar from '../components/nav/Sidebar';
import Topbar from '../components/nav/Topbar';

export const MainTemplate: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      maxWidth: '100%',

      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(3)}px 0`,
      },
    },
    toolbar: theme.mixins.toolbar,
  }),
);
