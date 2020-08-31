import { makeStyles, Theme } from '@material-ui/core';
import { white, semiGray } from '../../theme/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
    color: white,
    textTransform: 'uppercase',
    padding: 0,
  },
  isActive: {
    background: semiGray,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    flexGrow: 1,
  },
  menuLink: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
