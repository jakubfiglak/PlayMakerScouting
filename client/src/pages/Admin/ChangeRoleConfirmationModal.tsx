import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { User, UserRole } from '../../types/auth';
// Hooks
import { useChangeRole } from '../../hooks/users';

type Props = {
  user: User | null;
  handleClose: () => void;
  open: boolean;
  roleToAssign: Omit<UserRole, 'admin'>;
};

export const ChangeRoleConfirmationModal = ({
  user,
  handleClose,
  open,
  roleToAssign,
}: Props) => {
  const { mutate: changeRole, isLoading } = useChangeRole();

  function handleAccept() {
    if (user) {
      changeRole({ id: user.id, role: roleToAssign });
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz nadać użytkownikowi ${user?.firstName} ${user?.lastName} (${user?.email}) rolę ${roleToAssign}?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
