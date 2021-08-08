import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { Grid, Typography, Link } from '@material-ui/core';
// Custom components
import { StatusChip } from '../Reports/StatusChip';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils/dates';
import { getLabel } from '../../utils/getLabel';

type Props = { report: Report };

export const ReportBasicInfo = ({ report }: Props) => {
  const {
    player,
    order,
    author,
    playerCurrentClub,
    createdAt,
    status,
    avgRating,
    percentageRating,
    maxRatingScore,
  } = report;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography>
            <strong>Zawodnik: </strong>
            <Link component={RouterLink} to={`/players/${player.id}`}>
              {`${player.firstName} ${player.lastName} (ur. ${player.yearOfBirth})`}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Pozycja nominalna: </strong>
            {getLabel(player.position)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Klub: </strong>
            <Link component={RouterLink} to={`/clubs/${playerCurrentClub.id}`}>
              {`${playerCurrentClub.name} (${playerCurrentClub.division})`}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Średnia ocena: </strong>
            {avgRating.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Skala ocen: </strong>
            {maxRatingScore}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Ocena procentowa: </strong>
            {`${percentageRating.toFixed(2)}%`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Autor: </strong>
            {`${author.firstName} ${author.lastName}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Status raportu: </strong>
            <StatusChip status={status} />
          </Typography>
        </Grid>
        {order ? (
          <Grid item xs={12}>
            <Typography>
              <strong>Nr zlecenia: </strong>
              <Link component={RouterLink} to={`/orders/${order.id}`}>
                {order.docNumber}
              </Link>
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography>
            <strong>Data utworzenia: </strong>
            {`${formatDate(createdAt, true)}`}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
