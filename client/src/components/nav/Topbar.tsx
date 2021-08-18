import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// MUI components
import {
  AppBar,
  Toolbar,
  makeStyles,
  Theme,
  Divider,
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
// MUI icons
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Sports as MatchIcon,
} from '@material-ui/icons';
// Custom components
import { NavElement } from './NavElement';
import { QuickNoteButton } from './QuickNoteButton';
import { MatchButton } from './MatchButton';
import { PlaymakerLogo } from '../PlaymakerLogo';
// Types
import { NavItem } from './types';
import { Match } from '../../types/matches';

type Props = {
  navElements: NavItem[];
  onLogout: () => void;
  handleQuickNoteClick: () => void;
  handleMatchClick: () => void;
  match: Match | null;
};

export const Topbar = ({
  navElements,
  onLogout,
  handleQuickNoteClick,
  handleMatchClick,
  match,
}: Props) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <AppBar position="fixed" classes={{ root: classes.appBar }}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.title}>
          <PlaymakerLogo />
        </Link>
        <div className={classes.buttonsContainer}>
          {match ? (
            <Tooltip
              title={`Jesteś na meczu ${match.homeTeam.name} - ${match.awayTeam.name}`}
            >
              <MatchIcon color="secondary" className={classes.matchIcon} />
            </Tooltip>
          ) : null}
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
                <MatchButton
                  onClick={handleMatchClick}
                  isAtTheMatch={!!match}
                />
                <QuickNoteButton onClick={handleQuickNoteClick} />
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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchIcon: {
    marginRight: theme.spacing(2),
  },
}));
