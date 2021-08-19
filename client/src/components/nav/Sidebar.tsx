import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI Icons
import { ExitToApp as LogoutIcon } from '@material-ui/icons/';
// Custom components
import { NavElement } from './NavElement';
import { QuickNoteButton } from './QuickNoteButton';
import { MatchButton } from './MatchButton';
// Types
import { NavItem } from './types';

type Props = {
  navElements: NavItem[];
  onLogout: () => void;
  handleQuickNoteClick: () => void;
  handleMatchClick: () => void;
  isAtTheMatch: boolean;
};

export const Sidebar = ({
  navElements,
  onLogout,
  handleQuickNoteClick,
  handleMatchClick,
  isAtTheMatch,
}: Props) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List className={classes.list}>
        {navElements.map((element) => {
          const { icon, text, to } = element;
          return <NavElement icon={icon} text={text} to={to} key={text} />;
        })}
        <Divider />
        <MatchButton onClick={handleMatchClick} isAtTheMatch={isAtTheMatch} />
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
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: 240,
    background: theme.palette.primary.main,
  },
  toolbar: theme.mixins.toolbar,
  list: {
    color: theme.palette.background.paper,
    textTransform: 'uppercase',
  },
  active: {
    background: theme.palette.primary.light,
  },
}));
