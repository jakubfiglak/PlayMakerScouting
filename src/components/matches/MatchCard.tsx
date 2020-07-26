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
import { replaceCompetitionName, getChipColor, formatDate } from '../../utils';
import useModal from '../../hooks/useModal';
import Modal from '../common/Modal/Modal';
import Loader from '../common/Loader/Loader';
import useAuthState from '../../context/auth/useAuthState';

type MatchCardProps = {
  match: Match;
  deleteMatch: (id: string) => void;
  handleSetCurrent: (match: Match) => void;
};

const MatchCard = ({
  match,
  deleteMatch,
  handleSetCurrent,
}: MatchCardProps) => {
  const classes = useStyles();

  const authContext = useAuthState();

  const { loading, user } = authContext;

  const [isModalOpen, handleClickOpen, handleClose] = useModal();

  const { _id, competition, homeTeam, awayTeam, date } = match;

  const compLabel = replaceCompetitionName(competition);

  return (
    <Card>
      {loading && <Loader />}
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
              {formatDate(date, true)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <div>
            <IconButton
              aria-label="delete match"
              className={classes.delete}
              disabled={user?.role !== 'admin'}
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
            <Modal
              open={isModalOpen}
              message={`Usunąć mecz ${homeTeam.name} vs. ${
                awayTeam.name
              } z dnia ${formatDate(date)} z bazy?`}
              handleAccept={() => deleteMatch(_id)}
              handleClose={handleClose}
            />
          </div>
          <IconButton
            aria-label="edit match"
            onClick={() => handleSetCurrent(match)}
          >
            <EditIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MatchCard;
