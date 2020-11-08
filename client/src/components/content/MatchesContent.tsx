import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { MatchesFilterForm, MatchesForm } from '../forms';
import { TabPanel, Loader } from '../common';
import { MatchesTable } from '../tables';
// Types
import { MatchesFilterData } from '../../types/matches';
// Hooks
import { useMatchesState, useSimplifiedDataState } from '../../context';
import { useTabs, useTable, useAlert } from '../../hooks';
// Utils & data
import { formatDateObject, tomorrow, yearFromNow } from '../../utils';

export const MatchesContent = () => {
  const {
    loading,
    getMatches,
    matchesData: { docs, totalDocs },
    error,
    message,
    clearErrors,
    clearMessage,
  } = useMatchesState();
  const {
    loading: simpleDataLoading,
    getMyClubs,
    myClubsData,
  } = useSimplifiedDataState();

  const [activeTab, handleTabChange] = useTabs();
  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

  const [filters, setFilters] = useState<MatchesFilterData>({
    homeTeam: '',
    awayTeam: '',
    competition: '',
    dateFrom: formatDateObject(yearFromNow),
    dateTo: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getMyClubs();
    getMatches(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  return (
    <>
      {(loading || simpleDataLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="matches">
          <Tab label="Baza meczów" id="matches-0" aria-controls="matches-0" />
          <Tab label="Dodaj" id="matches-1" aria-controls="matches-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="matches">
        <MatchesFilterForm clubsData={myClubsData} setFilters={setFilters} />
        <MatchesTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          matches={docs}
          total={totalDocs}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="matches">
        <MatchesForm clubsData={myClubsData} />
      </TabPanel>
    </>
  );
};
