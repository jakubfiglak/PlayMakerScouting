import { createMuiTheme } from '@material-ui/core/styles';
import { plPL } from '@material-ui/core/locale';
import {
  lightGray,
  darkGray,
  semiGray,
  red,
  yellow,
  white,
  redTransparent,
} from './colors';

const theme = createMuiTheme(
  {
    typography: {
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
  },
  plPL,
);

export default theme;
