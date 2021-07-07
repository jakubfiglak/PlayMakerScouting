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
  | 'shirtNo'
>;

export const ReportBasicInfo = ({
  player,
  match,
  order,
  scout,
  playerCurrentClub,
  positionPlayed,
  shirtNo,
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
            <strong>Nr na koszulce w meczu: </strong>
            {shirtNo || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Data meczu: </strong>
            {formatDate(match.date, true)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Przeciwnik: </strong>
            {match.against}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Rozgrywki: </strong>
            {`${getLabel(match.competition)} (${getLabel(match.location)})`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Wynik meczu: </strong>
            {match.result}
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
