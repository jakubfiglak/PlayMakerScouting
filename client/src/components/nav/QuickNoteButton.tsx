import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI Icons
import { NoteAdd as QuickNoteIcon } from '@material-ui/icons/';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const QuickNoteButton = ({ onClick, disabled }: Props) => {
  const classes = useStyles();

  return (
    <li>
      <ListItem
        button
        onClick={onClick}
        disabled={disabled}
        className={classes.item}
      >
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

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
}));
