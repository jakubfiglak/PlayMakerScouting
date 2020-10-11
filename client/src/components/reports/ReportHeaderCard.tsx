import React from 'react';
// MUI components
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
// Types
import { Match } from '../../types/matches';
// Utils & data
import { replaceCompetitionName, formatDate } from '../../utils';

type ReportHeaderCardProps = {
  player: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  match: Match;
  order?: {
    _id: string;
    docNumber: string;
  };
  scout: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};

export const ReportHeaderCard = ({
  player,
  match,
  order,
  scout,
  createdAt,
}: ReportHeaderCardProps) => {
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
      </CardContent>
    </Card>
  );
};
