import { Drawer, Divider, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { NavList } from './NavList';

type Props = {
  handleQuickNoteClick: () => void;
  handleMatchClick: () => void;
  isAtTheMatch: boolean;
};

export const Sidebar = ({
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
      <NavList
        handleMatchClick={handleMatchClick}
        handleQuickNoteClick={handleQuickNoteClick}
        isAtTheMatch={isAtTheMatch}
      />
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
