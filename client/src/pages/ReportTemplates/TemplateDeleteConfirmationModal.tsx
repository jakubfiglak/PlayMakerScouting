import React from 'react';
// Custom components
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { ReportTemplate } from '../../types/reportTemplates';
// Hooks
import { useDeleteReportTemplate } from '../../hooks/reportTemplates';

type Props = {
  template: ReportTemplate | null;
  handleClose: () => void;
  open: boolean;
};

export const TemplateDeleteConfirmationModal = ({
  template,
  handleClose,
  open,
}: Props) => {
  const { mutate: deleteTemplate, isLoading } = useDeleteReportTemplate();

  function handleAccept() {
    if (template) {
      deleteTemplate(template.id);
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz usunąć szablon ${template?.name}?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
