import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { Team } from '../../types/teams';
// Hooks
import { useDeleteTeam } from '../../hooks/teams';

type Props = {
  team: Team | null;
  handleClose: () => void;
  open: boolean;
};

export const TeamDeleteConfirmationModal = ({
  team,
  handleClose,
  open,
}: Props) => {
  const { mutate: deleteTeam, isLoading } = useDeleteTeam();

  function handleAccept() {
    if (team) {
      deleteTeam(team.id);
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz usunąć zespół ${team?.name}?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
