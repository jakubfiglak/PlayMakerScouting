import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Link,
  Chip,
  Avatar,
} from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
// Types
import { Report } from '../../types/reports';
// Utils & data
import {
  formatDate,
  replaceCompetitionName,
  getRatingChipLabel,
  getRatingChipClass,
} from '../../utils';
// Styles
import { useStyles } from './styles';

type ReportCardProps = {
  report: Report;
  setCurrent: (report: Report) => void;
};

export const ReportCard = ({ report, setCurrent }: ReportCardProps) => {
  const classes = useStyles();

  const { _id, player, match, createdAt, finalRating } = report;

  return (
    <Card>
      <CardContent>
        <CardHeader title="Raport z obserwacji" subheader={`Nr: ${_id}`} />
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
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia: </strong>
              {`${formatDate(createdAt, true)}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Ocena ostateczna: </strong>
              <Chip
                avatar={<Avatar>{finalRating}</Avatar>}
                label={getRatingChipLabel(finalRating)}
                color="primary"
                className={getRatingChipClass(finalRating, classes)}
              />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit report"
              onClick={() => console.log('edytuj raport')}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zobacz pełny raport">
            <Link component={RouterLink} to={`/reports/${_id}`}>
              <IconButton aria-label="go to report">
                <SearchIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};
