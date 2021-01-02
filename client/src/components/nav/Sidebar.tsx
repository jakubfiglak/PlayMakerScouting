import React from 'react';
import { useHistory } from 'react-router-dom';
// MUI Components
import { Drawer, Divider } from '@material-ui/core';
// MUI Icons
import ExitToApp from '@material-ui/icons/ExitToApp';
// Custom components
import { NavElement } from './NavElement';
import { NavButton } from './NavButton';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import {
  scoutNavElements,
  adminNavElements,
  playmakerScoutNavElements,
} from './data';
// Styles
import { useStyles } from './styles';

const Sidebar = () => {
  const classes = useStyles();
  const authContext = useAuthState();
  const history = useHistory();

  const { logout } = authContext;
  const user = useAuthenticatedUser();

  let navElements = scoutNavElements;

  if (user.role === 'admin') {
    navElements = adminNavElements;
  }

  if (user.role === 'playmaker-scout') {
    navElements = playmakerScoutNavElements;
  }

  const onLogout = () => {
    history.push('/');
    logout();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      {navElements.map((element) => {
        const { Icon, text, link } = element;
        return <NavElement Icon={Icon} text={text} link={link} key={text} />;
      })}
      <Divider />
      <NavButton
        Icon={ExitToApp}
        text="Wyloguj się"
        onClick={onLogout}
        className={classes.link}
      />
    </Drawer>
  );
};

export default Sidebar;
