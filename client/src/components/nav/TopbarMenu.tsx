import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import { Menu, Divider, IconButton } from '@material-ui/core';
// MUI icons
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
// Custom components
import { NavElement } from './NavElement';
import { NavButton } from './NavButton';
// Hooks
import { useAuthState } from '../../context/auth/useAuthState';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Utils & data
import {
  scoutNavElements,
  playmakerScoutNavElements,
  adminNavElements,
} from './data';
// Styles
import { useStyles } from './styles';

export const TopbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={() => setIsMenuOpen(true)}
        ref={ref}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={ref.current}
        keepMounted
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
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
