import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { PlayerDetails } from './PlayerDetails';
import { ReportsTable } from '../Reports/ReportsTable';
import { ReportsTableRow } from '../Reports/ReportsTableRow';
import { NotesTable } from '../Notes/NotesTable';
import { NotesTableRow } from '../Notes/NotesTableRow';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { usePlayer } from '../../hooks/players';
import { usePlayersReports } from '../../hooks/reports';
import { usePlayersNotes } from '../../hooks/notes';
import { useTable } from '../../hooks/useTable';

type ParamTypes = {
  id: string;
};

export const PlayerPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
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

  const { id } = params;

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

  const isLoading = playerLoading || reportsLoading || notesLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
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
      {player && <PlayerDetails player={player} />}
      <section>
        <Typography
          variant="h6"
          component="h3"
          align="center"
          className={classes.title}
        >
          Raporty
        </Typography>
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
        <Typography
          variant="h6"
          component="h3"
          align="center"
          className={classes.title}
        >
          Notatki
        </Typography>
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
  title: {
    margin: theme.spacing(2),
  },
}));
