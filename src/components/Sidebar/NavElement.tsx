import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { NavLinkProps } from './types';
import useStyles from './styles';

const NavElement: React.FC<NavLinkProps> = ({ Icon, text, link }) => {
  const classes = useStyles();

  return (
    <NavLink
      to={link}
      className={classes.link}
      activeClassName={classes.isActive}
    >
      <ListItem button>
        <ListItemIcon className={classes.icon}>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  );
};

export default NavElement;
