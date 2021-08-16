import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// MUI Icons
import { NoteAdd as QuickNoteIcon } from '@material-ui/icons/';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const QuickNoteButton = ({ onClick, disabled }: Props) => {
  return (
    <li>
      <ListItem button onClick={onClick} disabled={disabled}>
        <ListItemIcon>
          <QuickNoteIcon color="error" />
        </ListItemIcon>
        <ListItemText
          primary="Szybka notatka"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </li>
  );
};
