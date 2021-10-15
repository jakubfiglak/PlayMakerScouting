import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI Icons
import { ExitToApp as LogoutIcon } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../context/auth/useAuthState';

export const LogoutButton = () => {
  const { logout } = useAuthState();
  const history = useHistory();
  const classes = useStyles();

  function handleLogout() {
    logout();
    history.push('/login');
  }

  return (
    <li>
      <ListItem button onClick={handleLogout} className={classes.item}>
        <ListItemIcon>
          <LogoutIcon color="error" />
        </ListItemIcon>
        <ListItemText
          primary="Wyloguj"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </li>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
}));
