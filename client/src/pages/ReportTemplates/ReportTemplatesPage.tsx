import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
// import { PlayersForm } from './PlayersForm';
// import { PlayersTable } from './PlayersTable';
// import { PlayersFilterForm } from './PlayersFilterForm';
// import { AddClubModal } from './AddClubModal';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
import { RatingsTable } from './RatingsTable';
// Types
import {
  PlayersFilterData,
  Player,
  PlayersFormData,
} from '../../types/players';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubsState } from '../../context/clubs/useClubsState';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useRatings } from '../../operations/queries/useRatings';
import { ReportTemplatesTable } from './ReportTemplatesTable';

export const ReportTemplatesPage = () => {
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  return (
    <MainTemplate>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="players">
          <Tab label="Umiejętności" id="Ratings" aria-controls="ratings" />
          <Tab
            label="Szablony raportów"
            id="report-templates"
            aria-controls="report-templates"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="ratings">
        <PageHeading title="Definicje umiejętności" />
        <RatingsTable />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        <PageHeading title="Szablony raportów" />
        <ReportTemplatesTable />
      </TabPanel>
    </MainTemplate>
  );
};
