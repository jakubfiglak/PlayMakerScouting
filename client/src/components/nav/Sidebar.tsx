import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Divider } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import useStyles from './styles';
import {
  scoutNavElements,
  adminNavElements,
  playmakerScoutNavElements,
} from './data';
import NavElement from './NavElement';
import NavButton from './NavButton';
import { useAuthState } from '../../context/auth/useAuthState';

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const authContext = useAuthState();
  const history = useHistory();

  const { logout, user } = authContext;

  let navElements = scoutNavElements;

  if (user?.role === 'admin') {
    navElements = adminNavElements;
  }

  if (user?.role === 'playmaker-scout') {
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
