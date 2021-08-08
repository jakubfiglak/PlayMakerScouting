import { useState } from 'react';
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
import { useMergePlayersDuplicates } from '../../hooks/players';
import { useMergeClubsDuplicates } from '../../hooks/clubs';

export const OperationsTab = () => {
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    isLoading: playersLoading,
    mutate: mergePlayersDuplicates,
  } = useMergePlayersDuplicates();
  const {
    isLoading: clubsLoading,
    mutate: mergeClubsDuplicates,
  } = useMergeClubsDuplicates();

  const [actionType, setActionType] = useState<'players' | 'clubs'>('players');

  return (
    <div>
      {(playersLoading || clubsLoading) && <Loader />}
      <section className={classes.section}>
        <Typography variant="h6" component="h3" gutterBottom>
          Scal duplikaty definicji zawodników
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setActionType('players');
            setModalOpen(true);
          }}
        >
          Scal
        </Button>
      </section>
      <section className={classes.section}>
        <Typography variant="h6" component="h3" gutterBottom>
          Scal duplikaty definicji klubów
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setActionType('clubs');
            setModalOpen(true);
          }}
        >
          Scal
        </Button>
      </section>
      <Modal
        open={isModalOpen}
        message={`Czy na pewno chcesz wykonać operację scalania zduplikowanych definicji ${
          actionType === 'players' ? 'zawodników' : 'klubów'
        }? Operacja ta jest nieodwracalna!`}
        handleAccept={
          actionType === 'players'
            ? mergePlayersDuplicates
            : mergeClubsDuplicates
        }
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
}));
