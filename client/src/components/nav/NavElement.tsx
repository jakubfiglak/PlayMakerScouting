import { useMemo, forwardRef, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
// MUI components
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';

type Props = {
  icon: ReactNode;
  text: string;
  to: string;
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
      <ListItem
        button
        component={renderLink}
        onClick={onClick}
        className={classes.item}
      >
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
  item: {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
  active: {
    background: theme.palette.primary.light,
  },
}));

export default NavElement;
