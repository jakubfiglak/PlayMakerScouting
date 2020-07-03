import { createMuiTheme } from '@material-ui/core/styles';
import { lightGray, darkGray, red, yellow, white } from './colors';

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
    },
    secondary: {
      main: yellow,
    },
    error: {
      main: red,
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
