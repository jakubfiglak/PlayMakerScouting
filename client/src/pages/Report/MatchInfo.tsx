// MUI components
import { Typography, Grid, Link } from '@material-ui/core';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

type Props = Pick<Report, 'match' | 'videoURL' | 'videoDescription'>;

export const MatchInfo = ({ match, videoURL, videoDescription }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography>
          <strong>Przeciwnik: </strong>
          {match.against || 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Rozgrywki: </strong>
          {match.competition ? getLabel(match.competition) : 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Dom/wyjazd: </strong>
          {match.location ? getLabel(match.location) : 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Data: </strong>
          {match.date ? formatDate(match.date) : 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Wynik: </strong>
          {match.result || 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>VideoURL: </strong>
          {videoURL ? (
            <Link href={videoURL} target="_blank" rel="noopener noreferrer">
              {videoURL}
            </Link>
          ) : (
            '-'
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Opis video: </strong>
          {videoDescription}
        </Typography>
      </Grid>
    </Grid>
  );
};
