import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { NotesTable } from '../Notes/NotesTable';
import { NotesTableRow } from '../Notes/NotesTableRow';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useMatch } from '../../hooks/matches';
import { useMatchesNotes } from '../../hooks/notes';
import { useTable } from '../../hooks/useTable';
import { MatchDetails } from './MatchDetails';

type ParamTypes = {
  id: string;
};

export const MatchPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('matchesNotesTable');

  const { id } = params;

  const { data: match, isLoading: matchLoading } = useMatch(id);

  const { data: notes, isLoading: notesLoading } = useMatchesNotes({
    matchId: id,
    page: page + 1,
    order,
    limit: rowsPerPage,
    sort: sortBy,
  });

  const isLoading = matchLoading || notesLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <Button
          to="/matches"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy meczów
        </Button>
        <PageHeading title="Szczegóły meczu" />
      </div>
      {match ? <MatchDetails match={match} /> : null}
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
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
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
