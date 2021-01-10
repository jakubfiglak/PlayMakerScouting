import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// MUI components
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
  Divider,
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
// MUI icons
import { Menu as MenuIcon, ExitToApp as LogoutIcon } from '@material-ui/icons';
// Custom components
import { NavElement } from './NavElement';
// Types
import { NavItem } from './types';

type Props = {
  navElements: NavItem[];
  onLogout: () => void;
};

export const Topbar = ({ navElements, onLogout }: Props) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <AppBar position="fixed" classes={{ root: classes.appBar }}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap component="h1">
            PlayMaker Pro Scouting
          </Typography>
        </Link>
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
            <List className={classes.list}>
              {navElements.map((element) => {
                const { icon, text, to } = element;
                return (
                  <NavElement
                    icon={icon}
                    text={text}
                    to={to}
                    key={text}
                    onClick={() => setIsMenuOpen(false)}
                  />
                );
              })}
              <Divider />
              <li>
                <ListItem button onClick={onLogout}>
                  <ListItemIcon>
                    <LogoutIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Wyloguj się"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </li>
            </List>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 240px)',
      marginLeft: 240,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.background.paper,
  },
  list: {
    textTransform: 'uppercase',
  },
}));
