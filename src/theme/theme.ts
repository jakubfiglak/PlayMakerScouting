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
});

export default theme;
