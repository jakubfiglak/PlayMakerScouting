import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { NavLinkProps } from './types';
import useStyles from './styles';

const NavElement: React.FC<NavLinkProps> = ({
  Icon,
  text,
  link,
  className,
}) => {
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
