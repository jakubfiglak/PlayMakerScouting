import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Grid,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import { Match } from '../../types/matches';
import { replaceCompetitionName } from '../../utils/replaceCompetitionName';
import { getChipColor } from '../../utils/getChipColor';

type MatchCardProps = {
  match: Match;
};

const MatchCard = ({ match }: MatchCardProps) => {
  const classes = useStyles();

  const { competition, homeTeam, awayTeam, date } = match;

  const compLabel = replaceCompetitionName(competition);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography align="center">
              <Chip
                avatar={<Avatar>{compLabel && compLabel[0]}</Avatar>}
                label={compLabel}
                color={getChipColor(competition)}
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">{homeTeam.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" align="center">
              vs
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">{awayTeam.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2" align="center">
              {date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <IconButton aria-label="delete match" className={classes.delete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit match">
            <EditIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MatchCard;
