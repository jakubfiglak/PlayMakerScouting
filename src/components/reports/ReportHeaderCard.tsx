import React from 'react';
// MUI components
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { replaceCompetitionName, formatDate } from '../../utils';

type ReportCardProps = {
  report: Report;
};

export const ReportHeaderCard = ({ report }: ReportCardProps) => {
  const { player, match, order, user, createdAt } = report;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Zawodnik: </strong>
              {`${player.firstName} ${player.lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Mecz: </strong>
              {`${match.homeTeam.name} - ${
                match.awayTeam.name
              } (${replaceCompetitionName(match.competition)}, ${formatDate(
                match.date,
              )})`}
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
              {`${user.name} ${user.surname}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia: </strong>
              {`${formatDate(createdAt, true)}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
