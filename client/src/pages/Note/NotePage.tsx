import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { NoteDetails } from './NoteDetails';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useNote } from '../../hooks/notes';

type ParamTypes = {
  id: string;
};

export const NotePage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();

  const { id } = params;

  const { data: note, isLoading: noteLoading } = useNote(id);

  const isLoading = noteLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <Button
          to="/notes"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy notatek
        </Button>
        <PageHeading title="Szczegóły notatki" />
      </div>
      {note ? <NoteDetails note={note} /> : null}
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
