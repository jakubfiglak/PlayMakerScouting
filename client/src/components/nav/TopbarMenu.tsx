import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Divider, IconButton } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import {
  scoutNavElements,
  playmakerScoutNavElements,
  adminNavElements,
} from './data';
import NavElement from './NavElement';
import NavButton from './NavButton';
import useStyles from './styles';
import { useAuthState } from '../../context';

const TopbarMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {navElements.map((element) => {
          const { Icon, text, link } = element;
          return (
            <NavElement
              Icon={Icon}
              text={text}
              link={link}
              key={text}
              className={classes.menuLink}
            />
          );
        })}
        <Divider />
        <NavButton
          Icon={ExitToApp}
          text="Wyloguj się"
          onClick={onLogout}
          className={classes.menuLink}
        />
      </Menu>
    </div>
  );
};

export default TopbarMenu;
