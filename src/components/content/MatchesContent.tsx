import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';
import TabPanel from '../common/TabPanel/TabPanel';
import Loader from '../common/Loader/Loader';
import useTabs from '../../hooks/useTabs';
import useSimplifiedDataState from '../../context/simplifiedData/useSimplifiedDataState';
import useMatchesState from '../../context/matches/useMatchesState';
import { Match, MatchesFilterData } from '../../types/matches';
import MatchCard from '../matches/MatchCard';
import MatchesFilterForm from '../forms/matches/MatchesFilterForm';
import { formatDateObject } from '../../utils';

const MatchesContent = () => {
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
    dateFrom: formatDateObject(new Date()),
    dateTo: formatDateObject(new Date()),
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
      <TabPanel value={activeTab} index={0} title="clubs">
        <MatchesFilterForm clubsData={clubsData} setFilters={setFilters} />
        <Grid container spacing={2}>
          {matchesData.data.map((match) => (
            <Grid item xs={12} sm={6} md={3} key={match._id}>
              <MatchCard match={match} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs" />
    </>
  );
};

export default MatchesContent;
