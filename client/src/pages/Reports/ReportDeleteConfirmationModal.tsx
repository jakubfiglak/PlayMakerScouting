import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
// Types
import { Report } from '../../types/reports';
// Hooks
import { useDeleteReport } from '../../hooks/reports';

type Props = { report: Report | null; handleClose: () => void; open: boolean };

export const ReportDeleteConfirmationModal = ({
  report,
  handleClose,
  open,
}: Props) => {
  const { mutate: deleteReport, isLoading } = useDeleteReport();

  function handleAccept() {
    if (report) {
      deleteReport(report.id);
    }
    handleClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        message={`Czy na pewno chcesz usunąć raport nr ${report?.docNumber} (zawodnik: ${report?.player.firstName} ${report?.player.lastName})?`}
        handleAccept={handleAccept}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
