import React from 'react';
// MUI components
import { Grid, Typography } from '@material-ui/core';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils/formatDate';
import { getLabel } from '../../utils/getLabel';
import {
  competitionLabels,
  matchLocationLabels,
  positionLabels,
} from '../../data/labels';

type Props = Pick<Report, 'player' | 'match' | 'order' | 'scout' | 'createdAt'>;

export const ReportBasicInfo = ({
  player,
  match,
  order,
  scout,
  createdAt,
}: Props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            <strong>Zawodnik: </strong>
            {`${player.firstName} ${player.lastName}, ${getLabel(
              player.position,
              positionLabels,
            )} (${player.club.name})`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Mecz: </strong>
            {`vs. ${match.against} (${getLabel(
              match.location,
              matchLocationLabels,
            )}), ${getLabel(match.competition, competitionLabels)}`}
          </Typography>
        </Grid>
        {order && (
          <Grid item xs={12}>
            <Typography>
              <strong>Nr zlecenia: </strong>
              {order}
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
