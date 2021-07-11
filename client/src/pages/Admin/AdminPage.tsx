import React from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { UsersTab } from './UsersTab';
import { TeamsTab } from './TeamsTab';
import { AccessManagementTab } from './AccessManagementTab';
import { MainTemplate } from '../../templates/MainTemplate';
import { TabPanel } from '../../components/TabPanel';
// Hooks
import { useTabs } from '../../hooks/useTabs';

export const AdminPage = () => {
  const [activeTab, handleTabChange] = useTabs();

  return (
    <MainTemplate>
      <AppBar position="static">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="admin-panel"
        >
          <Tab label="Użytkownicy" id="users" aria-controls="users" />
          <Tab label="Zespoły" id="teams" aria-controls="teams" />
          <Tab
            label="Dostępy"
            id="accessmanagement"
            aria-controls="accessmanagement"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="users">
        <UsersTab />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="teams">
        <TeamsTab />
      </TabPanel>
      <TabPanel value={activeTab} index={2} title="accessmanagement">
        <AccessManagementTab />
      </TabPanel>
    </MainTemplate>
  );
};
