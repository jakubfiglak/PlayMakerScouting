import React from 'react';
import { Link } from 'react-router-dom';
// MUI components
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Grid,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import { Assessment as ReportIcon } from '@material-ui/icons';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

type Props = {
  report: Report;
  title: string;
};

export const ReportCard = ({ report, title }: Props) => {
  const classes = useStyles();

  const { player, docNumber, id: _id, scout, createdAt, avgRating } = report;

  return (
    <Card className={classes.container}>
      <CardActionArea>
        <Link to={`/reports/${_id}`} className={classes.link}>
          <CardHeader
            avatar={
              <Avatar aria-label="report icon" className={classes.avatar}>
                <ReportIcon />
              </Avatar>
            }
            title={title.toUpperCase()}
            titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
            subheader={`Raport nr ${docNumber}`}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>Zawodnik: </strong>
              {player.firstName} {player.lastName}, {getLabel(player.position)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Scout: </strong>
              {scout.firstName} {scout.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia: </strong>
              {formatDate(createdAt, true)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Średnia ocen: </strong>
              {avgRating.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '0 auto',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  avatar: {
    background: theme.palette.secondary.main,
    width: 50,
    height: 50,
  },
}));
