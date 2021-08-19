import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// MUI Icons
import { DriveEta as GoIcon } from '@material-ui/icons/';

type Props = {
  onClick: () => void;
  isAtTheMatch: boolean;
};

export const MatchButton = ({ onClick, isAtTheMatch }: Props) => {
  return (
    <li>
      <ListItem button onClick={onClick}>
        <ListItemIcon>
          <GoIcon color="error" />
        </ListItemIcon>
        <ListItemText
          primary={isAtTheMatch ? 'Opuść mecz' : 'Jedź na mecz'}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </li>
  );
};
