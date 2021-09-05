import { useState } from 'react';
import { useParams } from 'react-router-dom';
// MUI components
import { Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ClubDetails } from './ClubDetails';
import { ClubsForm } from '../Clubs/ClubsForm';
import { PlayersTable } from '../Players/PlayersTable';
import { PlayersTableRow } from '../Players/PlayersTableRow';
import { MatchesTable } from '../Matches/MatchesTable';
import { MatchesTableRow } from '../Matches/MatchesTableRow';
import { MainTemplate } from '../../templates/MainTemplate';
import { SingleAssetPageActions } from '../../components/SingleAssetPageActions';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useTable } from '../../hooks/useTable';
import { useClub, useUpdateClub } from '../../hooks/clubs';
import { useClubsPlayers } from '../../hooks/players';
import { useClubsMatches } from '../../hooks/matches';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type ParamTypes = {
  id: string;
};

export const ClubPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const [isEditState, setEditState] = useState(false);

  const { id } = params;

  const user = useAuthenticatedUser();

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
  const { mutate: updateClub, isLoading: updateClubLoading } = useUpdateClub(
    id,
  );

  const isLoading =
    clubLoading || playersLoading || matchesLoading || updateClubLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <SingleAssetPageActions
          isEditState={isEditState}
          linkText="Wróć do listy klubów"
          linkTo="/clubs"
          isEditDisabled={!(user.role === 'admin' || user.id === club?.author)}
          onEditClick={() => setEditState(!isEditState)}
        />
        <PageHeading title={`Profil klubu ${club?.name}`} />
      </div>
      {club && !isEditState ? <ClubDetails club={club} /> : null}
      {club && isEditState ? (
        <ClubsForm
          current={club || null}
          onCancelClick={() => setEditState(false)}
          onSubmit={updateClub}
        />
      ) : null}
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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
    marginBottom: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2),
  },
}));
