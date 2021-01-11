import React, { useMemo, forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
// MUI components
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Types
import { NavItem } from './types';

type Props = NavItem & {
  onClick?: () => void;
};

export const NavElement = ({ icon, text, to, onClick }: Props) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line
      forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
        <NavLink
          to={to}
          ref={ref}
          {...itemProps}
          activeClassName={classes.active}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink} onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </li>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  active: {
    background: theme.palette.action.hover,
  },
}));

export default NavElement;
