import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';
// Custom components
import { MatchesFilterForm, MatchesForm } from '../forms';
import { TabPanel, Loader } from '../common';
import { MatchCard } from '../matches';
// Types
import { Match, MatchesFilterData } from '../../types/matches';
// Hooks
import { useMatchesState, useSimplifiedDataState } from '../../context';
import { useTabs } from '../../hooks';
// Utils & data
import { formatDateObject, tomorrow, yearFromNow } from '../../utils';

export const MatchesContent = () => {
  const matchesContext = useMatchesState();
  const simplifiedDataContext = useSimplifiedDataState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    loading,
    getMatches,
    matchesData,
    deleteMatch,
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
    getMatches(filters);
  }, [filters]);

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
        <Grid container spacing={2}>
          {matchesData.data.map((match) => (
            <Grid item xs={12} sm={6} md={3} key={match._id}>
              <MatchCard
                match={match}
                deleteMatch={deleteMatch}
                handleSetCurrent={handleSetCurrent}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="matches">
        <MatchesForm clubsData={clubsData} />
      </TabPanel>
    </>
  );
};
