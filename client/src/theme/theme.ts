import { createMuiTheme } from '@material-ui/core/styles';
import {
  lightGray,
  darkGray,
  semiGray,
  red,
  yellow,
  white,
  redTransparent,
} from './colors';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: '32px',
      fontWeight: 'bold',
    },
  },
  palette: {
    primary: {
      main: darkGray,
      light: semiGray,
    },
    secondary: {
      main: yellow,
    },
    error: {
      main: red,
      light: redTransparent,
    },
    background: {
      default: lightGray,
    },
    common: {
      white,
    },
  },
  overrides: {
    MuiTableSortLabel: {
      root: {
        '&$active': {
          color: yellow,

          '&& $icon': {
            color: yellow,
          },
        },
        '&:hover': {
          color: yellow,
        },
        '&:focus': {
          color: yellow,
        },
      },
    },
  },
});

export default theme;
