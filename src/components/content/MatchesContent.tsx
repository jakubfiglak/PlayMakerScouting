import React, { useEffect } from 'react';
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';
import TabPanel from '../common/TabPanel/TabPanel';
import Loader from '../common/Loader/Loader';
import useTabs from '../../hooks/useTabs';
import useMatchesState from '../../context/matches/useMatchesState';
import { Match } from '../../types/matches';
import MatchCard from '../matches/MatchCard';

const MatchesContent = () => {
  const matchesContext = useMatchesState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    loading,
    getMatches,
    matchesData,
    deleteMatch,
    setCurrent,
  } = matchesContext;

  useEffect(() => {
    getMatches();
    console.log(matchesData);
  }, []);

  // const [filters, setFilters] = useState<ClubsFilterData>({
  //   name: '',
  //   division: '',
  //   voivodeship: '',
  // });

  const handleSetCurrent = (match: Match) => {
    setCurrent(match);
    setActiveTab(1);
  };

  return (
    <>
      {loading && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="matches">
          <Tab label="Baza meczów" id="matches-0" aria-controls="matches-0" />
          <Tab label="Dodaj/edytuj" id="matches-1" aria-controls="matches-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="clubs">
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
