import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { ReportsTable } from './ReportsTable';
import { ReportsFilterForm } from './ReportsFilterForm';
import { NewReportForm } from './forms/NewReportForm';
import { EditReportForm } from './forms/EditReportForm';
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
import {
  useReports,
  useCreateReport,
  useUpdateReport,
} from '../../hooks/reports';
import { useClubsList } from '../../hooks/clubs';
import { usePlayersList, useCreatePlayer } from '../../hooks/players';
import { useOrdersList } from '../../hooks/orders';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

import { useAlertsState } from '../../context/alerts/useAlertsState';

type LocationState = { activeTab?: number; report?: Report };

export const ReportsPage = () => {
  const { state } = useLocation<LocationState | null>();
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  const {
    mutate: createReport,
    isLoading: createReportLoading,
  } = useCreateReport();
  const {
    mutate: updateReport,
    isLoading: updateReportLoading,
  } = useUpdateReport(currentReport?.id || '');
  const { data: clubs, isLoading: clubsLoading } = useClubsList();
  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: orders, isLoading: ordersLoading } = useOrdersList();
  const {
    mutate: createPlayer,
    isLoading: createPlayerLoading,
  } = useCreatePlayer();

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

  const [filters, setFilters] = useState<ReportsFilterData>({
    player: '',
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
  }, [setActiveTab, state]);

  const handleSetCurrent = (report: Report) => {
    setCurrentReport(report);
    setActiveTab(1);
  };

  const onAddReport = (data: ReportDTO) => {
    createReport(data);
    setActiveTab(0);
  };

  function onUpdateReport(data: ReportDTO) {
    updateReport(data);
    setActiveTab(0);
    setCurrentReport(null);
  }

  const handleEditFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    setCurrentReport(null);
  };

  const isLoading =
    clubsLoading ||
    ordersLoading ||
    createReportLoading ||
    updateReportLoading ||
    playersLoading ||
    createPlayerLoading ||
    reportsLoading;

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
          setFilters={setFilters}
        />
        <ReportsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={reports?.totalDocs || 0}
          reports={reports?.docs || []}
          onEditClick={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="reports">
        <PageHeading
          title={
            currentReport
              ? `Edycja raportu nr ${currentReport.docNumber}`
              : 'Tworzenie nowego raportu'
          }
        />
        {currentReport ? (
          <EditReportForm
            report={currentReport}
            onReset={handleEditFormReset}
            onSubmit={onUpdateReport}
          />
        ) : (
          <NewReportForm
            isOrderOptionDisabled={user.role === 'scout'}
            playersList={players || []}
            ordersList={orders || []}
            onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
            onSubmit={onAddReport}
          />
        )}
        <AddPlayerModal
          clubsData={clubs || []}
          onClose={() => setIsAddPlayerModalOpen(false)}
          onSubmit={createPlayer}
          open={isAddPlayerModalOpen}
        />
      </TabPanel>
    </MainTemplate>
  );
};
