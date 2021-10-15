import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI Icons
import { DriveEta as GoIcon } from '@material-ui/icons/';

type Props = {
  onClick: () => void;
  isAtTheMatch: boolean;
};

export const MatchButton = ({ onClick, isAtTheMatch }: Props) => {
  const classes = useStyles();

  return (
    <li>
      <ListItem button onClick={onClick} className={classes.item}>
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

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
}));
