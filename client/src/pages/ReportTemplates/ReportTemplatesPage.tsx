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
import { Rating } from '../../types/ratings';
import { ReportTemplate } from '../../types/reportTemplates';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubsState } from '../../context/clubs/useClubsState';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useRatings } from '../../operations/queries/useRatings';
import { ReportTemplatesTable } from './ReportTemplatesTable';
import { RatingsForm } from './RatingsForm';
import { ReportTemplatesForm } from './ReportTemplatesForm';
import { RatingDeleteConfirmationModal } from './RatingDeleteConfirmationModal';

export const ReportTemplatesPage = () => {
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const [currentRating, setCurrentRating] = useState<Rating | null>(null);
  const [
    isRatingDeleteConfirmationModalOpen,
    setRatingDeleteConfirmationModalOpen,
  ] = useState(false);
  const [
    currentReportTemplate,
    setCurrentReportTemplate,
  ] = useState<ReportTemplate | null>(null);

  function handleDeleteRatingClick(rating: Rating) {
    setCurrentRating(rating);
    setRatingDeleteConfirmationModalOpen(true);
  }

  return (
    <MainTemplate>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="players">
          <Tab label="Cechy" id="Ratings" aria-controls="ratings" />
          <Tab
            label="Szablony raportów"
            id="report-templates"
            aria-controls="report-templates"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="ratings">
        <PageHeading title="Definicje ocenianych cech" />
        <RatingsForm
          current={currentRating}
          clearCurrent={() => setCurrentRating(null)}
        />
        <RatingsTable
          onEditClick={setCurrentRating}
          onDeleteClick={handleDeleteRatingClick}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        <PageHeading title="Szablony raportów" />
        <ReportTemplatesForm current={currentReportTemplate} />
        <ReportTemplatesTable onEditClick={setCurrentReportTemplate} />
      </TabPanel>
      <RatingDeleteConfirmationModal
        rating={currentRating}
        open={isRatingDeleteConfirmationModalOpen}
        handleClose={() => {
          setRatingDeleteConfirmationModalOpen(false);
          setCurrentRating(null);
        }}
      />
    </MainTemplate>
  );
};
