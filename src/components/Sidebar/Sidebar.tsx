import React from 'react';
import { Drawer, Divider } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import useStyles from './styles';
import navElements from './data';
import NavElement from './NavElement';
import NavButton from './NavButton';
import useAuthState from '../../context/auth/useAuthState';

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const authContext = useAuthState();

  const { logout } = authContext;

  const onLogout = () => {
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
      <NavButton Icon={ExitToApp} text="Wyloguj się" onClick={onLogout} />
    </Drawer>
  );
};

export default Sidebar;
