import React from 'react';
// MUI components
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
// Types
import { MatchData } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils';

type ReportHeaderCardProps = {
  player: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  match: MatchData;
  order?: string;
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
              {match}
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
      </CardContent>
    </Card>
  );
};
