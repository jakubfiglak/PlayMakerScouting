import React from 'react';
import { Drawer, Divider } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import useStyles from './styles';
import navElements from './data';
import NavElement from './NavElement';

const Sidebar: React.FC = () => {
  const classes = useStyles();

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
      <NavElement Icon={ExitToApp} text="Wyloguj się" link="/logout" />
    </Drawer>
  );
};

export default Sidebar;
