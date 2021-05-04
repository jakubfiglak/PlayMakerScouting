import React from 'react';
// MUI components
import { Grid, Typography } from '@material-ui/core';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils/dates';
import { getLabel } from '../../utils/getLabel';

type Props = Pick<
  Report,
  | 'player'
  | 'match'
  | 'order'
  | 'scout'
  | 'createdAt'
  | 'playerCurrentClub'
  | 'positionPlayed'
>;

export const ReportBasicInfo = ({
  player,
  match,
  order,
  scout,
  playerCurrentClub,
  positionPlayed,
  createdAt,
}: Props) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography>
            <strong>Zawodnik: </strong>
            {`${player.firstName} ${player.lastName} (ur. ${player.yearOfBirth})`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Klub: </strong>
            {`${playerCurrentClub.name} (${playerCurrentClub.division})`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Pozycja / pozycja w meczu: </strong>
            {`${getLabel(player.position)} / ${getLabel(positionPlayed)}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Mecz: </strong>
            {`${formatDate(match.date, true)} vs. ${match.against} (${getLabel(
              match.location,
            )}), ${getLabel(match.competition)}`}
          </Typography>
        </Grid>
        {order && (
          <Grid item xs={12}>
            <Typography>
              <strong>Nr zlecenia: </strong>
              {order.docNumber}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography>
            <strong>Scout: </strong>
            {`${scout.firstName} ${scout.lastName}`}
          </Typography>
        </Grid>
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
