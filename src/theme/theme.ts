import { createMuiTheme } from '@material-ui/core/styles';
import { lightGray } from './colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333d4a',
    },
    secondary: {
      main: '#f9a930',
    },
    background: {
      default: lightGray,
    },
  },
});

export default theme;
