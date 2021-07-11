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
import { Report, ReportFormData, ReportsFilterData } from '../../types/reports';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useReports } from '../../hooks/reports';
import { useClubsList } from '../../hooks/clubs';
import { usePlayersList, useCreatePlayer } from '../../hooks/players';
import { useOrdersList } from '../../hooks/orders';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useReportsState } from '../../context/reports/useReportsState';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type LocationState = { setActiveTab: number };

export const ReportsPage = () => {
  const { state } = useLocation<LocationState | null>();

  const {
    loading,
    getReports,
    reportsData,
    setCurrent,
    addReport,
    editReport,
    clearCurrent,
    current,
  } = useReportsState();

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

  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

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
    if (state?.setActiveTab) {
      setActiveTab(state.setActiveTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.setActiveTab]);

  const handleSetCurrent = (report: Report) => {
    setCurrent(report);
    setActiveTab(1);
  };

  const onAddReport = (data: ReportFormData) => {
    addReport(data);
    setActiveTab(0);
  };

  const handleEditFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    clearCurrent();
  };

  return (
    <MainTemplate>
      {(loading ||
        playersLoading ||
        clubsLoading ||
        ordersLoading ||
        reportsLoading) && <Loader />}
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
            current
              ? `Edycja raportu nr ${current.docNumber}`
              : 'Tworzenie nowego raportu'
          }
        />
        {current ? (
          <EditReportForm
            report={current}
            onReset={handleEditFormReset}
            onSubmit={editReport}
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
