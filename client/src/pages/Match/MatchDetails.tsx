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
import { Sports as MatchIcon } from '@material-ui/icons';
// Types
import { Match } from '../../types/matches';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDateObject } from '../../utils/dates';

type Props = {
  match: Match;
};

export const MatchDetails = ({ match }: Props) => {
  const classes = useStyles();

  const { homeTeam, awayTeam, competition, date, result, videoURL } = match;
  const matchDate = new Date(date);

  return (
    <Card className={classes.container}>
      <CardHeader
        avatar={
          <Avatar aria-label="match avatar" className={classes.avatar}>
            <MatchIcon />
          </Avatar>
        }
        title={getLabel(competition)}
        titleTypographyProps={{ variant: 'h3' }}
        subheader={formatDateObject(matchDate)}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Gospodarz: </strong>
              <Link component={RouterLink} to={`/clubs/${homeTeam.id}`}>
                {homeTeam.name} ({getLabel(homeTeam.division)})
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Gość: </strong>
              <Link component={RouterLink} to={`/clubs/${awayTeam.id}`}>
                {awayTeam.name} ({getLabel(awayTeam.division)})
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Wynik: </strong>
              {result}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Video: </strong>
              {videoURL ? (
                <Link
                  href={videoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  {videoURL}
                </Link>
              ) : (
                '-'
              )}
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
}));
