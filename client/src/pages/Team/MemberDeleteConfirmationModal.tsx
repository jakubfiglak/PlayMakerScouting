import React from 'react';
// Custom components
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { User } from '../../types/auth';
// Hooks
import { useDeleteMember } from '../../hooks/teams';

type Props = {
  member: User | null;
  handleClose: () => void;
  open: boolean;
  teamId: string;
};

export const MemberDeleteConfirmationModal = ({
  member,
  handleClose,
  open,
  teamId,
}: Props) => {
  const { mutate: deleteMember, isLoading } = useDeleteMember(teamId);

  function handleAccept() {
    if (member) {
      deleteMember({ memberId: member.id });
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz usunąć członka ${member?.firstName} ${member?.lastName}?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
