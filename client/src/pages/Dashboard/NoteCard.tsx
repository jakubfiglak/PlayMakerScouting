import { Link } from 'react-router-dom';
// MUI components
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Grid,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { Note as NoteIcon } from '@material-ui/icons';
// Types
import { Note } from '../../types/notes';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

type Props = {
  note: Note;
  title: string;
};

export const NoteCard = ({ note, title }: Props) => {
  const classes = useStyles();

  const { player, docNumber, id, author, createdAt, rating, shirtNo } = note;

  return (
    <Card className={classes.container}>
      <CardActionArea>
        <Link to={`/notes/${id}`} className={classes.link}>
          <CardHeader
            avatar={
              <Avatar aria-label="note icon" className={classes.avatar}>
                <NoteIcon />
              </Avatar>
            }
            title={title.toUpperCase()}
            titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
            subheader={`Notatka nr ${docNumber}`}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Zawodnik: </strong>
              {player
                ? `${player.firstName} ${player.lastName}, ${getLabel(
                    player.position,
                  )}`
                : `Zawodnik nr ${shirtNo || 'N/A'}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Scout: </strong>
              {author.firstName} {author.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia: </strong>
              {formatDate(createdAt, true)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Ocena: </strong>
              {rating}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '0 auto',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  avatar: {
    background: theme.palette.secondary.main,
    width: 50,
    height: 50,
  },
}));
