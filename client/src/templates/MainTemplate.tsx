import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CssBaseline,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { Sidebar } from '../components/nav/Sidebar';
import { Topbar } from '../components/nav/Topbar';
import { useAuthState } from '../context/auth/useAuthState';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { navItems } from '../components/nav/navItems';

export const MainTemplate: FC = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  const { logout } = useAuthState();
  const user = useAuthenticatedUser();

  const navElements = navItems.filter((item) =>
    item.allowedRoles.includes(user.role),
  );

  const onLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar navElements={navElements} onLogout={onLogout} />
      <Sidebar navElements={navElements} onLogout={onLogout} />
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
        padding: theme.spacing(3, 1),
      },
    },
    toolbar: theme.mixins.toolbar,
  }),
);
