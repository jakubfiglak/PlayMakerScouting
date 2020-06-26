import { makeStyles, Theme } from '@material-ui/core';
import { white, semiGray } from '../../theme/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.error.main,
  },
  link: {
    textDecoration: 'none',
    color: white,
    textTransform: 'uppercase',
    padding: 0,
  },
  isActive: {
    background: semiGray,
  },
}));

export default useStyles;
