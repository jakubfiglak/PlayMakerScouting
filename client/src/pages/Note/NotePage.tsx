import { useState } from 'react';
import { useParams } from 'react-router-dom';
// MUI components
import { makeStyles, Theme } from '@material-ui/core';
// Custom components
import { NoteDetails } from './NoteDetails';
import { NotesForm } from '../Notes/NotesForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { SingleAssetPageActions } from '../../components/SingleAssetPageActions';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useNote, useUpdateNote } from '../../hooks/notes';
import { usePlayersList } from '../../hooks/players';
import { useMatchesList } from '../../hooks/matches';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type ParamTypes = {
  id: string;
};

export const NotePage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const [isEditState, setEditState] = useState(false);

  const { id } = params;

  const user = useAuthenticatedUser();

  const { data: note, isLoading: noteLoading } = useNote(id);

  const { mutate: updateNote, isLoading: updateNoteLoading } = useUpdateNote(
    id,
  );

  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: matches, isLoading: matchesLoading } = useMatchesList();

  const isLoading =
    noteLoading || updateNoteLoading || playersLoading || matchesLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <SingleAssetPageActions
          isEditState={isEditState}
          linkText="Wróć do listy notatek"
          linkTo="/notes"
          isEditDisabled={
            !(user.role === 'admin' || user.id === note?.author.id)
          }
          onEditClick={() => setEditState(!isEditState)}
        />
        <PageHeading title="Szczegóły notatki" />
      </div>
      {note && !isEditState ? <NoteDetails note={note} /> : null}
      {note && isEditState ? (
        <NotesForm
          current={note}
          onSubmit={updateNote}
          matchesData={matches || []}
          playersData={players || []}
        />
      ) : null}
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
