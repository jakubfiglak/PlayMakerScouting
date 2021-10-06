import { Link as RouterLink } from 'react-router-dom';
// MUI components
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { Note as NoteIcon, SportsSoccer as BallIcon } from '@material-ui/icons';
// Types
import { Note } from '../../types/notes';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';
import { StyledRating } from '../../components/StyledRating';

type Props = {
  note: Note;
};

export const NoteDetails = ({ note }: Props) => {
  const classes = useStyles();

  const {
    author,
    docNumber,
    rating,
    maxRatingScore,
    percentageRating,
    text,
    match,
    player,
    playerCurrentClub,
    positionPlayed,
    shirtNo,
  } = note;

  return (
    <Card className={classes.container}>
      <CardHeader
        avatar={
          <Avatar aria-label="note avatar" className={classes.avatar}>
            <NoteIcon />
          </Avatar>
        }
        title={`Notatka nr ${docNumber}`}
        titleTypographyProps={{ variant: 'h3' }}
        subheader={`Autor: ${author.firstName} ${author.lastName}`}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Zawodnik: </strong>
              {player ? (
                <Link component={RouterLink} to={`/players/${player.id}`}>
                  {`${player.firstName} ${player.lastName}`}
                </Link>
              ) : (
                'N/A'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Klub zawodnika: </strong>
              {playerCurrentClub ? (
                <Link
                  component={RouterLink}
                  to={`/clubs/${playerCurrentClub.id}`}
                >
                  {`${playerCurrentClub.name} (${getLabel(
                    playerCurrentClub.division,
                  )})`}
                </Link>
              ) : (
                'N/A'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Mecz: </strong>
              {match ? (
                <Link component={RouterLink} to={`/matches/${match.id}`}>
                  {`${match.homeTeam.name} - ${match.awayTeam.name} (${getLabel(
                    match.competition,
                  )})`}
                </Link>
              ) : (
                'N/A'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Data meczu: </strong>
              {match ? formatDate(match.date) : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Pozycja zawodnika w meczu: </strong>
              {positionPlayed ? getLabel(positionPlayed) : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Nr zawodnika w meczu: </strong>
              {shirtNo || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.ratingContainer}>
              <strong>Ocena: </strong>
              <StyledRating
                value={rating}
                max={maxRatingScore}
                icon={<BallIcon fontSize="inherit" />}
                readOnly
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Ocena %: </strong>
              {`${percentageRating.toFixed(1)}%`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Treść: </strong>
              {text}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 500,
    margin: '0 auto',
  },
  avatar: {
    background: theme.palette.secondary.main,
    width: 50,
    height: 50,
  },
  ratingContainer: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));
