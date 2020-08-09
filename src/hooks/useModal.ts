import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return [isModalOpen, handleClickOpen, handleClose] as const;
};
