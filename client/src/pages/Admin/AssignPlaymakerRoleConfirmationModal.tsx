import React from 'react';
// Custom components
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { User } from '../../types/auth';
// Hooks
import { useAssignPlaymakerRole } from '../../hooks/users';

type Props = {
  user: User | null;
  handleClose: () => void;
  open: boolean;
};

export const AssignPlaymakerRoleConfirmationModal = ({
  user,
  handleClose,
  open,
}: Props) => {
  const { mutate: assignPlaymakerRole, isLoading } = useAssignPlaymakerRole();

  function handleAccept() {
    if (user) {
      assignPlaymakerRole(user.id);
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz nadać użytkownikowi ${user?.firstName} ${user?.lastName} (${user?.email}) rolę playmaker-scout?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
