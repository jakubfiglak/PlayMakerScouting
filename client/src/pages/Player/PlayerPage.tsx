import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { PlayerDetails } from './PlayerDetails';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';

type ParamTypes = {
  id: string;
};

export const PlayerPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const { loading, playerData, getPlayer } = usePlayersState();

  const { id } = params;

  useEffect(() => {
    getPlayer(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MainTemplate>
      {loading && <Loader />}
      <div className={classes.container}>
        <Button
          to="/players"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy zawodników
        </Button>
        <PageHeading title="Profil zawodnika" />
      </div>
      {playerData && <PlayerDetails player={playerData} />}
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginBottom: theme.spacing(1),
  },
}));
