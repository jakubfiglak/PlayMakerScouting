import React from 'react';
import { NavLink } from 'react-router-dom';
// MUI components
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// Types
import { NavLinkProps } from './types';
// Styles
import { useStyles } from './styles';

export const NavElement = ({ Icon, text, link, className }: NavLinkProps) => {
  const classes = useStyles();

  return (
    <NavLink
      to={link}
      className={classes.link}
      activeClassName={classes.isActive}
    >
      <ListItem button>
        <ListItemIcon>
          <Icon color="error" />
        </ListItemIcon>
        <ListItemText primary={text} className={className} />
      </ListItem>
    </NavLink>
  );
};

export default NavElement;
