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
} from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
// Custom components
import { FinalRatingChip } from './FinalRatingChip';
// Types
import { Report } from '../../types/reports';
// Utils & data
import { formatDate } from '../../utils';

type ReportCardProps = {
  report: Report;
  onEditClick: (report: Report) => void;
};

export const ReportCard = ({ report, onEditClick }: ReportCardProps) => {
  const { _id, docNumber, player, match, createdAt, finalRating } = report;

  return (
    <Card>
      <CardContent>
        <CardHeader
          title="Raport z obserwacji"
          subheader={`Nr: ${docNumber}`}
        />
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
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia: </strong>
              {`${formatDate(createdAt, true)}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FinalRatingChip finalRating={finalRating} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit report"
              onClick={() => onEditClick(report)}
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
