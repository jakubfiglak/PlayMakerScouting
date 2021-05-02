import React from 'react';
// Custom components
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { Rating } from '../../types/ratings';
// Hooks
import { useDeleteRating } from '../../operations/mutations/useDeleteRating';

type Props = { rating: Rating | null; handleClose: () => void; open: boolean };

export const RatingDeleteConfirmationModal = ({
  rating,
  handleClose,
  open,
}: Props) => {
  const { mutate: deleteRating, isLoading } = useDeleteRating();

  function handleAccept() {
    if (rating) {
      deleteRating(rating.id);
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz usunąć cechę ${rating?.name}?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
