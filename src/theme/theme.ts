import { createMuiTheme } from '@material-ui/core/styles';
import { lightGray, darkGray, red, yellow } from './colors';

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
  },
});

export default theme;
