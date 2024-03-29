import { FC, useState } from 'react';
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
import { GoToTheMatchFormModal } from '../components/GoToTheMatchFormModal';
import { NotesFormModal } from '../pages/Notes/NotesFormModal';
// Hooks
import { usePlayersList } from '../hooks/players';
import { useMatchesList } from '../hooks/matches';
import { useGoToTheMatch, useLeaveTheMatch } from '../hooks/users';
// Utils & data
import { useAccountInfo } from '../hooks/auth';

export const MainTemplate: FC = ({ children }) => {
  const classes = useStyles();

  const [isQuickNoteModalOpen, setQuickNoteModalOpen] = useState(false);
  const [isGoToMatchFormModalOpen, setGoToMatchFormModalOpen] = useState(false);

  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: matches, isLoading: matchesLoading } = useMatchesList();
  const {
    mutate: goToTheMatch,
    isLoading: goToTheMatchLoading,
  } = useGoToTheMatch();
  const {
    mutate: leaveTheMatch,
    isLoading: leaveTheMatchLoading,
  } = useLeaveTheMatch();
  const { data: account, isLoading: accountLoading } = useAccountInfo();

  const isLoading =
    playersLoading ||
    matchesLoading ||
    goToTheMatchLoading ||
    leaveTheMatchLoading ||
    accountLoading;

  const handleMatchClick = account?.match
    ? leaveTheMatch
    : () => setGoToMatchFormModalOpen(true);

  return (
    <div className={classes.root}>
      {isLoading && <Loader />}
      <CssBaseline />
      <Topbar
        handleQuickNoteClick={() => setQuickNoteModalOpen(true)}
        handleMatchClick={handleMatchClick}
        match={account?.match || null}
      />
      <Sidebar
        handleQuickNoteClick={() => setQuickNoteModalOpen(true)}
        handleMatchClick={handleMatchClick}
        isAtTheMatch={!!account?.match}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <NotesFormModal
          open={isQuickNoteModalOpen}
          matchesData={matches || []}
          playersData={players || []}
          onClose={() => setQuickNoteModalOpen(false)}
        />
        <GoToTheMatchFormModal
          matchesData={matches || []}
          onSubmit={goToTheMatch}
          open={isGoToMatchFormModalOpen}
          onClose={() => setGoToMatchFormModalOpen(false)}
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
