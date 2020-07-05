import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return [isModalOpen, handleClickOpen, handleClose] as const;
};

export default useModal;
