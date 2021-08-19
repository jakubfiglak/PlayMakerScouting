import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ClubDetails } from './ClubDetails';
import { PlayersTable } from '../Players/PlayersTable';
import { PlayersTableRow } from '../Players/PlayersTableRow';
import { MatchesTable } from '../Matches/MatchesTable';
import { MatchesTableRow } from '../Matches/MatchesTableRow';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useTable } from '../../hooks/useTable';
import { useClub } from '../../hooks/clubs';
import { useClubsPlayers } from '../../hooks/players';
import { useClubsMatches } from '../../hooks/matches';

type ParamTypes = {
  id: string;
};

export const ClubPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();

  const { id } = params;

  const {
    tableSettings: playersTableSettings,
    handleChangePage: handleChangePlayersTablePage,
    handleChangeRowsPerPage: handleChangePlayersTableRowsPerPage,
    handleSort: handlePlayersTableSort,
  } = useTable('clubsPlayersTable');
  const {
    tableSettings: matchesTableSettings,
    handleChangePage: handleChangeMatchesTablePage,
    handleChangeRowsPerPage: handleChangeMatchesTableRowsPerPage,
    handleSort: handleMatchesTableSort,
  } = useTable('clubsMatchesTable');

  const { data: club, isLoading: clubLoading } = useClub(id);
  const { data: players, isLoading: playersLoading } = useClubsPlayers({
    clubId: id,
    page: playersTableSettings.page + 1,
    limit: playersTableSettings.rowsPerPage,
    order: playersTableSettings.order,
    sort: playersTableSettings.sortBy,
  });
  const { data: matches, isLoading: matchesLoading } = useClubsMatches({
    clubId: id,
    page: matchesTableSettings.page + 1,
    limit: matchesTableSettings.rowsPerPage,
    order: matchesTableSettings.order,
    sort: matchesTableSettings.sortBy,
  });

  const isLoading = clubLoading || playersLoading || matchesLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
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
      <section>
        <Typography
          variant="h6"
          component="h3"
          align="center"
          className={classes.title}
        >
          Zawodnicy
        </Typography>
        <PlayersTable
          page={playersTableSettings.page}
          rowsPerPage={playersTableSettings.rowsPerPage}
          sortBy={playersTableSettings.sortBy}
          order={playersTableSettings.order}
          handleChangePage={handleChangePlayersTablePage}
          handleChangeRowsPerPage={handleChangePlayersTableRowsPerPage}
          handleSort={handlePlayersTableSort}
          total={players?.totalDocs || 0}
        >
          {players
            ? players.docs.map((player) => (
                <PlayersTableRow key={player.id} player={player} />
              ))
            : null}
        </PlayersTable>
      </section>
      <section>
        <Typography
          variant="h6"
          component="h3"
          align="center"
          className={classes.title}
        >
          Mecze
        </Typography>
        <MatchesTable
          page={matchesTableSettings.page}
          rowsPerPage={matchesTableSettings.rowsPerPage}
          sortBy={matchesTableSettings.sortBy}
          order={matchesTableSettings.order}
          handleChangePage={handleChangeMatchesTablePage}
          handleChangeRowsPerPage={handleChangeMatchesTableRowsPerPage}
          handleSort={handleMatchesTableSort}
          total={matches?.totalDocs || 0}
        >
          {matches
            ? matches.docs.map((match) => (
                <MatchesTableRow key={match.id} match={match} />
              ))
            : null}
        </MatchesTable>
      </section>
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
