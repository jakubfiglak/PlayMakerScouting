import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import {
  CssBaseline,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/nav/Sidebar';
import { Topbar } from '../components/nav/Topbar';
import { NotesFormModal } from '../pages/Notes/NotesFormModal';
// Hooks
import { useAuthState } from '../context/auth/useAuthState';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { usePlayersList } from '../hooks/players';
import { useMatchesList } from '../hooks/matches';
import { useCreateNote } from '../hooks/notes';
// Utils & data
import { navItems } from '../components/nav/navItems';

export const MainTemplate: FC = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  const [isQuickNoteModalOpen, setQuickNoteModalOpen] = useState(false);

  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: matches, isLoading: matchesLoading } = useMatchesList();
  const { mutate: createNote, isLoading: createNoteLoading } = useCreateNote();

  const { logout } = useAuthState();
  const user = useAuthenticatedUser();

  const navElements = navItems.filter((item) =>
    item.allowedRoles.includes(user.role),
  );

  const onLogout = () => {
    logout();
    history.push('/login');
  };

  const isLoading = playersLoading || matchesLoading || createNoteLoading;

  return (
    <div className={classes.root}>
      {isLoading && <Loader />}
      <CssBaseline />
      <Topbar
        navElements={navElements}
        onLogout={onLogout}
        handleQuickNoteClick={() => setQuickNoteModalOpen(true)}
      />
      <Sidebar
        navElements={navElements}
        onLogout={onLogout}
        handleQuickNoteClick={() => setQuickNoteModalOpen(true)}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <NotesFormModal
          open={isQuickNoteModalOpen}
          matchesData={matches || []}
          playersData={players || []}
          onClose={() => setQuickNoteModalOpen(false)}
          onSubmit={createNote}
        />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      maxWidth: '100%',

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3, 1),
      },
    },
    toolbar: theme.mixins.toolbar,
  }),
);
