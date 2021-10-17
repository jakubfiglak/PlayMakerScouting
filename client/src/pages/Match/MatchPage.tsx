import { useState } from 'react';
import { useParams } from 'react-router-dom';
// MUI components
import { makeStyles } from '@material-ui/core';
// Custom components
import { MatchDetails } from './MatchDetails';
import { MatchesForm } from '../Matches/MatchesForm';
import { NotesTable } from '../Notes/NotesTable';
import { NotesTableRow } from '../Notes/NotesTableRow';
import { PageHeading } from '../../components/PageHeading';
import { SectionHeading } from '../../components/SectionHeading';
import { SingleAssetPageActions } from '../../components/SingleAssetPageActions';
import { Loader } from '../../components/Loader';
// Hooks
import { useMatch, useUpdateMatch } from '../../hooks/matches';
import { useMatchesNotes } from '../../hooks/notes';
import { useClubsList } from '../../hooks/clubs';
import { useTable } from '../../hooks/useTable';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type ParamTypes = {
  id: string;
};

export const MatchPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const [isEditState, setEditState] = useState(false);

  const { id } = params;

  const user = useAuthenticatedUser();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('matchesNotesTable');

  const { data: match, isLoading: matchLoading } = useMatch(id);

  const { data: notes, isLoading: notesLoading } = useMatchesNotes({
    matchId: id,
    page: page + 1,
    order,
    limit: rowsPerPage,
    sort: sortBy,
  });

  const { data: clubs, isLoading: clubsLoading } = useClubsList();

  const { mutate: updateMatch, isLoading: updateMatchLoading } = useUpdateMatch(
    id,
  );

  const isLoading =
    matchLoading || notesLoading || updateMatchLoading || clubsLoading;

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <SingleAssetPageActions
          isEditState={isEditState}
          linkText="Wróć do listy meczów"
          linkTo="/matches"
          isEditDisabled={!(user.role === 'admin' || user.id === match?.author)}
          onEditClick={() => setEditState(!isEditState)}
        />
        <PageHeading title="Szczegóły meczu" />
      </div>
      {match && !isEditState ? <MatchDetails match={match} /> : null}
      {match && isEditState ? (
        <MatchesForm
          current={match}
          onSubmit={updateMatch}
          clubsData={clubs || []}
        />
      ) : null}
      <section>
        <SectionHeading title="Notatki" />
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
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
