import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// MUI Icons
import { ExitToApp as LogoutIcon } from '@material-ui/icons/';

type Props = {
  onClick: () => void;
};

export const LogoutButton = ({ onClick }: Props) => {
  return (
    <li>
      <ListItem button onClick={onClick}>
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
