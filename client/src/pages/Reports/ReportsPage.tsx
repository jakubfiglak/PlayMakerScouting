import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import { AppBar, Tabs, Tab, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ReportsTable } from './ReportsTable';
import { ReportsTableRow } from './ReportsTableRow';
import { ReportsFilterForm } from './ReportsFilterForm';
import { ReportDeleteConfirmationModal } from './ReportDeleteConfirmationModal';
import { CreateReportForm } from './forms/CreateReportForm';
import { EditReportForm } from './forms/EditReportForm';
import { PrinteableReport } from '../Report/PrinteableReport';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { AddPlayerModal } from '../../components/modals/AddPlayerModal';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Types
import { Report, ReportDTO, ReportsFilterData } from '../../types/reports';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  useReports,
  useCreateReport,
  useUpdateReport,
  useSetReportStatus,
} from '../../hooks/reports';
import { usePlayersList } from '../../hooks/players';
import { useOrdersList } from '../../hooks/orders';
import { useClubsList } from '../../hooks/clubs';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useSettingsState } from '../../context/settings/useSettingsState';
import { useDraftsState } from '../../context/drafts/useDraftsState';

type LocationState = { activeTab?: number; report?: Report; orderId?: string };

const initialFilters: ReportsFilterData = {
  player: '',
  position: '',
  club: '',
  rating: 'all',
};

export const ReportsPage = () => {
  const { state } = useLocation<LocationState | null>();
  const ref = useRef<HTMLDivElement | null>(null);
  const [
    isDeleteReportConfirmationModalOpen,
    setDeleteReportConfirmationModalOpen,
  ] = useState(false);
  const { defaultReportBackgroundImageUrl } = useSettingsState();
  const { note } = useDraftsState();

  const classes = useStyles({ background: defaultReportBackgroundImageUrl });
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [activeOrderId, setActiveOrderId] = useState('');

  const {
    mutate: createReport,
    isLoading: createReportLoading,
  } = useCreateReport();
  const {
    mutate: updateReport,
    isLoading: updateReportLoading,
  } = useUpdateReport(currentReport?.id || '');
  const {
    mutate: setReportStatus,
    isLoading: setReportStatusLoading,
  } = useSetReportStatus();
  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: orders, isLoading: ordersLoading } = useOrdersList();
  const { data: clubs, isLoading: clubsLoading } = useClubsList();

  const { setAlert } = useAlertsState();

  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('reportsTable');

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const [filters, setFilters] = useLocalStorage<ReportsFilterData>({
    key: 'reportsFilters',
    initialValue: initialFilters,
  });

  const { data: reports, isLoading: reportsLoading } = useReports({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });

  useEffect(() => {
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
    if (state?.report) {
      setCurrentReport(state.report);
    }
    if (state?.orderId) {
      setActiveOrderId(state.orderId);
    }
  }, [setActiveTab, state]);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    bodyClass: classes.pageBody,
    documentTitle: 'Report',
    onAfterPrint: () => setCurrentReport(null),
  }) as () => void;

  function handlePrintClick(report: Report) {
    setCurrentReport(report);
    setTimeout(() => handlePrint(), 100);
  }

  function handleDeleteReportClick(report: Report) {
    setCurrentReport(report);
    setDeleteReportConfirmationModalOpen(true);
  }

  const handleEditClick = (report: Report) => {
    setCurrentReport(report);
    setActiveTab(1);
  };

  const handleAddReport = (data: ReportDTO) => {
    createReport(data);
    setActiveTab(0);
    setActiveOrderId('');
  };

  function handleUpdateReport(data: ReportDTO) {
    updateReport(data);
    setActiveTab(0);
    setCurrentReport(null);
  }

  const handleFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    setCurrentReport(null);
    setActiveOrderId('');
  };

  const isLoading =
    ordersLoading ||
    createReportLoading ||
    updateReportLoading ||
    playersLoading ||
    setReportStatusLoading ||
    reportsLoading ||
    clubsLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="reports">
          <Tab label="Raporty" id="reports-0" aria-controls="reports-0" />
          <Tab label="Dodaj/edytuj" id="reports-1" aria-controls="reports-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="reports">
        <PageHeading title="Baza raportów" />
        <ReportsFilterForm
          playersData={players || []}
          clubsData={clubs || []}
          filters={filters}
          onFilter={setFilters}
          onClearFilters={() => setFilters(initialFilters)}
        />
        <ReportsTable
          actions
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={reports?.totalDocs || 0}
        >
          {reports
            ? reports.docs.map((report) => {
                const areActionsEnabled =
                  user.role === 'admin' || user.id === report.author.id;

                return (
                  <ReportsTableRow
                    key={report.id}
                    report={report}
                    isMenuActive
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteReportClick}
                    onSetStatusClick={setReportStatus}
                    onPrintClick={handlePrintClick}
                    isEditOptionEnabled={
                      areActionsEnabled && report.status === 'in-prep'
                    }
                    isDeleteOptionEnabled={areActionsEnabled}
                    isSetStatusOptionEnabled={areActionsEnabled}
                    isAuthorNameClickable={user.role === 'admin'}
                  />
                );
              })
            : null}
        </ReportsTable>
        <ReportDeleteConfirmationModal
          open={isDeleteReportConfirmationModalOpen}
          report={currentReport}
          handleClose={() => {
            setCurrentReport(null);
            setDeleteReportConfirmationModalOpen(false);
          }}
        />
        {currentReport ? (
          <div className={classes.print}>
            <div ref={ref}>
              <PrinteableReport report={currentReport} />
            </div>
          </div>
        ) : null}
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="reports">
        <PageHeading
          title={
            currentReport
              ? `Edycja raportu nr ${currentReport.docNumber}`
              : `Tworzenie nowego raportu ${
                  note ? `na podstawie notatki nr ${note.docNumber}` : ''
                }`
          }
        />
        {currentReport ? (
          <EditReportForm
            report={currentReport}
            onReset={handleFormReset}
            onSubmit={handleUpdateReport}
          />
        ) : (
          <CreateReportForm
            isOrderOptionDisabled={user.role === 'scout'}
            playersList={players || []}
            ordersList={orders || []}
            onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
            onSubmit={handleAddReport}
            onReset={handleFormReset}
            activeOrderId={activeOrderId}
          />
        )}
        <AddPlayerModal
          onClose={() => setIsAddPlayerModalOpen(false)}
          open={isAddPlayerModalOpen}
        />
      </TabPanel>
    </MainTemplate>
  );
};

type StyleProps = {
  background: string;
};

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  buttonsContainer: {
    display: 'flex',
  },
  print: {
    overflow: 'hidden',
    height: 0,
  },
  pageBody: (props) => ({
    backgroundImage: `url(${props.background})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
}));
