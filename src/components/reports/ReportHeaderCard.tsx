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
  order?: string;
  user: {
    _id: string;
    name: string;
    surname: string;
  };
  createdAt: string;
};

export const ReportHeaderCard = ({
  player,
  match,
  order,
  user,
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
