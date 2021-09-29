import { useState } from 'react';
import { useParams } from 'react-router-dom';
// MUI components
import { Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { PlayerDetails } from './PlayerDetails';
import { PlayersForm } from '../Players/PlayersForm';
import { ReportsTable } from '../Reports/ReportsTable';
import { ReportsTableRow } from '../Reports/ReportsTableRow';
import { NotesTable } from '../Notes/NotesTable';
import { NotesTableRow } from '../Notes/NotesTableRow';
import { MainTemplate } from '../../templates/MainTemplate';
import { SingleAssetPageActions } from '../../components/SingleAssetPageActions';
import { PageHeading } from '../../components/PageHeading';
import { SectionHeading } from '../../components/SectionHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { usePlayer, useUpdatePlayer } from '../../hooks/players';
import { useClubsList } from '../../hooks/clubs';
import { usePlayersReports } from '../../hooks/reports';
import { usePlayersNotes } from '../../hooks/notes';
import { useTable } from '../../hooks/useTable';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type ParamTypes = {
  id: string;
};

export const PlayerPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const [isEditState, setEditState] = useState(false);

  const { id } = params;

  const user = useAuthenticatedUser();

  const {
    tableSettings: reportsTableSettings,
    handleChangePage: handleReportsTableChangePage,
    handleChangeRowsPerPage: handleReportsTableChangeRowsPerPage,
    handleSort: handleReportsTableSort,
  } = useTable('playersReportsTable');

  const {
    tableSettings: notesTableSettings,
    handleChangePage: handleNotesTableChangePage,
    handleChangeRowsPerPage: handleNotesTableChangeRowsPerPage,
    handleSort: handleNotesTableSort,
  } = useTable('playersNotesTable');

  const { data: player, isLoading: playerLoading } = usePlayer(id);

  const { data: reports, isLoading: reportsLoading } = usePlayersReports({
    playerId: id,
    page: reportsTableSettings.page + 1,
    order: reportsTableSettings.order,
    limit: reportsTableSettings.rowsPerPage,
    sort: reportsTableSettings.sortBy,
  });

  const { data: notes, isLoading: notesLoading } = usePlayersNotes({
    playerId: id,
    page: notesTableSettings.page + 1,
    order: notesTableSettings.order,
    limit: notesTableSettings.rowsPerPage,
    sort: notesTableSettings.sortBy,
  });

  const { data: clubs, isLoading: clubsLoading } = useClubsList();

  const {
    mutate: updatePlayer,
    isLoading: updatePlayerLoading,
  } = useUpdatePlayer(id);

  const isLoading =
    playerLoading ||
    reportsLoading ||
    notesLoading ||
    updatePlayerLoading ||
    clubsLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <SingleAssetPageActions
          isEditState={isEditState}
          linkText="Wróć do listy zawodników"
          linkTo="/players"
          isEditDisabled={
            !(user.role === 'admin' || user.id === player?.author)
          }
          onEditClick={() => setEditState(!isEditState)}
        />
        <PageHeading title="Profil zawodnika" />
      </div>
      {player && !isEditState ? <PlayerDetails player={player} /> : null}
      {player && isEditState ? (
        <PlayersForm
          current={player}
          clubsData={clubs || []}
          onSubmit={updatePlayer}
        />
      ) : null}
      <section>
        <SectionHeading title="Raporty" />
        <ReportsTable
          page={reportsTableSettings.page}
          rowsPerPage={reportsTableSettings.rowsPerPage}
          sortBy={reportsTableSettings.sortBy}
          order={reportsTableSettings.order}
          handleChangePage={handleReportsTableChangePage}
          handleChangeRowsPerPage={handleReportsTableChangeRowsPerPage}
          handleSort={handleReportsTableSort}
          total={reports?.totalDocs || 0}
        >
          {reports
            ? reports.docs.map((report) => (
                <ReportsTableRow key={report.id} report={report} />
              ))
            : null}
        </ReportsTable>
      </section>
      <section>
        <SectionHeading title="Notatki" />
        <NotesTable
          page={notesTableSettings.page}
          rowsPerPage={notesTableSettings.rowsPerPage}
          sortBy={notesTableSettings.sortBy}
          order={notesTableSettings.order}
          handleChangePage={handleNotesTableChangePage}
          handleChangeRowsPerPage={handleNotesTableChangeRowsPerPage}
          handleSort={handleNotesTableSort}
          total={notes?.totalDocs || 0}
        >
          {notes
            ? notes.docs.map((note) => (
                <NotesTableRow key={note.id} note={note} />
              ))
            : null}
        </NotesTable>
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
}));
