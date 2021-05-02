import React, { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { RatingsTable } from './RatingsTable';
import { ReportTemplatesTable } from './ReportTemplatesTable';
import { RatingsForm } from './RatingsForm';
import { ReportTemplatesForm } from './ReportTemplatesForm';
import { RatingDeleteConfirmationModal } from './RatingDeleteConfirmationModal';
import { TemplateDeleteConfirmationModal } from './TemplateDeleteConfirmationModal';
import { TabPanel } from '../../components/TabPanel';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Types
import { Rating } from '../../types/ratings';
import { ReportTemplate } from '../../types/reportTemplates';
// Hooks
import { useTabs } from '../../hooks/useTabs';

export const ReportTemplatesPage = () => {
  const [activeTab, handleTabChange] = useTabs();

  const [currentRating, setCurrentRating] = useState<Rating | null>(null);
  const [
    currentReportTemplate,
    setCurrentReportTemplate,
  ] = useState<ReportTemplate | null>(null);
  const [
    isRatingDeleteConfirmationModalOpen,
    setRatingDeleteConfirmationModalOpen,
  ] = useState(false);
  const [
    isTemplateDeleteConfimationModalOpen,
    setTemplateDeleteConfirmationModalOpen,
  ] = useState(false);

  function handleDeleteRatingClick(rating: Rating) {
    setCurrentRating(rating);
    setRatingDeleteConfirmationModalOpen(true);
  }

  function handleDeleteTemplateClick(template: ReportTemplate) {
    setCurrentReportTemplate(template);
    setTemplateDeleteConfirmationModalOpen(true);
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
        <ReportTemplatesForm
          current={currentReportTemplate}
          clearCurrent={() => setCurrentReportTemplate(null)}
        />
        <ReportTemplatesTable
          onEditClick={setCurrentReportTemplate}
          onDeleteClick={handleDeleteTemplateClick}
        />
      </TabPanel>
      <RatingDeleteConfirmationModal
        rating={currentRating}
        open={isRatingDeleteConfirmationModalOpen}
        handleClose={() => {
          setRatingDeleteConfirmationModalOpen(false);
          setCurrentRating(null);
        }}
      />
      <TemplateDeleteConfirmationModal
        template={currentReportTemplate}
        open={isTemplateDeleteConfimationModalOpen}
        handleClose={() => {
          setTemplateDeleteConfirmationModalOpen(false);
          setCurrentReportTemplate(null);
        }}
      />
    </MainTemplate>
  );
};
