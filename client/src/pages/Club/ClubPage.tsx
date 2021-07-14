import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ClubDetails } from './ClubDetails';
import { PlayersTable } from '../Players/PlayersTable';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useTable } from '../../hooks/useTable';
import { useClub } from '../../hooks/clubs';
import { useClubsPlayers } from '../../hooks/players';

type ParamTypes = {
  id: string;
};

export const ClubPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();

  const { id } = params;

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('clubsPlayersTable');

  const { data: club, isLoading: clubLoading } = useClub(id);
  const { data: players, isLoading: playersLoading } = useClubsPlayers({
    clubId: id,
    page: page + 1,
    limit: rowsPerPage,
    order,
    sort: sortBy,
  });

  return (
    <MainTemplate>
      {(clubLoading || playersLoading) && <Loader />}
      <div className={classes.container}>
        <Button
          to="/clubs"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy klubów
        </Button>
        <PageHeading title="Profil klubu" />
      </div>
      {club ? <ClubDetails club={club} /> : null}
      <Typography
        variant="h6"
        component="h3"
        align="center"
        className={classes.title}
      >
        Zawodnicy
      </Typography>
      <PlayersTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        players={players?.docs || []}
        total={players?.totalDocs || 0}
      />
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
  title: {
    margin: theme.spacing(2),
  },
}));
