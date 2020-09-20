import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { MatchesFilterForm, MatchesForm } from '../forms';
import { TabPanel, Loader } from '../common';
import { MatchesTable } from '../tables';
// Types
import { Match, MatchesFilterData } from '../../types/matches';
// Hooks
import { useMatchesState, useSimplifiedDataState } from '../../context';
import { useTabs, useTable } from '../../hooks';
// Utils & data
import { formatDateObject, tomorrow, yearFromNow } from '../../utils';

export const MatchesContent = () => {
  const matchesContext = useMatchesState();
  const simplifiedDataContext = useSimplifiedDataState();

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

  const {
    loading,
    getMatches,
    matchesData: { docs, totalDocs },
    setCurrent,
  } = matchesContext;

  const {
    loading: simpleDataLoading,
    getClubs,
    clubsData,
  } = simplifiedDataContext;

  const [filters, setFilters] = useState<MatchesFilterData>({
    homeTeam: '',
    awayTeam: '',
    competition: '',
    dateFrom: formatDateObject(yearFromNow),
    dateTo: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getClubs();
    getMatches(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  const handleSetCurrent = (match: Match) => {
    setCurrent(match);
    setActiveTab(1);
  };

  return (
    <>
      {(loading || simpleDataLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="matches">
          <Tab label="Baza meczów" id="matches-0" aria-controls="matches-0" />
          <Tab label="Dodaj/edytuj" id="matches-1" aria-controls="matches-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="matches">
        <MatchesFilterForm clubsData={clubsData} setFilters={setFilters} />
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
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="matches">
        <MatchesForm clubsData={clubsData} />
      </TabPanel>
    </>
  );
};
