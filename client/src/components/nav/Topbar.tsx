import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// MUI components
import {
  AppBar,
  Toolbar,
  makeStyles,
  Theme,
  IconButton,
  Menu,
  Tooltip,
} from '@material-ui/core';
// MUI icons
import { Menu as MenuIcon, Sports as MatchIcon } from '@material-ui/icons';
// Custom components
import { PlaymakerLogo } from '../PlaymakerLogo';
// Types
import { Match } from '../../types/matches';
import { NavList } from './NavList';

type Props = {
  handleQuickNoteClick: () => void;
  handleMatchClick: () => void;
  match: Match | null;
};

export const Topbar = ({
  handleQuickNoteClick,
  handleMatchClick,
  match,
}: Props) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
              classes={{ paper: classes.menu }}
            >
              <NavList
                handleMatchClick={handleMatchClick}
                handleQuickNoteClick={handleQuickNoteClick}
                isAtTheMatch={!!match}
              />
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
  menu: {
    background: theme.palette.primary.light,
  },
}));
