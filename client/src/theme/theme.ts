import { createMuiTheme } from '@material-ui/core/styles';
import { plPL } from '@material-ui/core/locale';
import { black, lightGray, green, red, yellow } from './colors';

const fontFamily = [
  'Lato',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif',
].join(',');

const theme = createMuiTheme(
  {
    typography: {
      fontFamily,
      h2: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.5rem',
      },
    },
    palette: {
      primary: {
        main: black,
      },
      secondary: {
        main: red,
      },
      success: {
        main: green,
      },
      info: {
        main: yellow,
      },
      error: {
        main: red,
      },
      background: {
        default: lightGray,
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
  },
  plPL,
);

export default theme;
