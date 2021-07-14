import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab, Fab, makeStyles } from '@material-ui/core';
// MUI icons
import { Add as AddIcon } from '@material-ui/icons';
// Custom components
import { RatingsTable } from './RatingsTable';
import { ReportTemplatesTable } from './ReportTemplatesTable';
import { RatingsFormModal } from './RatingsFormModal';
import { ReportTemplatesFormModal } from './ReportTemplatesFormModal';
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
  const classes = useStyles();
  const [activeTab, handleTabChange] = useTabs();

  const [currentRating, setCurrentRating] = useState<Rating | null>(null);
  const [
    currentReportTemplate,
    setCurrentReportTemplate,
  ] = useState<ReportTemplate | null>(null);
  const [isRatingsModalOpen, setRatingsModalOpen] = useState(false);
  const [
    isRatingDeleteConfirmationModalOpen,
    setRatingDeleteConfirmationModalOpen,
  ] = useState(false);
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const [
    isTemplateDeleteConfimationModalOpen,
    setTemplateDeleteConfirmationModalOpen,
  ] = useState(false);

  function handleDeleteRatingClick(rating: Rating) {
    setCurrentRating(rating);
    setRatingDeleteConfirmationModalOpen(true);
  }

  function handleEditRatingClick(rating: Rating) {
    setCurrentRating(rating);
    setRatingsModalOpen(true);
  }

  function handleDeleteTemplateClick(template: ReportTemplate) {
    setCurrentReportTemplate(template);
    setTemplateDeleteConfirmationModalOpen(true);
  }

  function handleEditTemplateClick(template: ReportTemplate) {
    setCurrentReportTemplate(template);
    setTemplateModalOpen(true);
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
        <RatingsFormModal
          current={currentRating}
          onClose={() => {
            setCurrentRating(null);
            setRatingsModalOpen(false);
          }}
          open={isRatingsModalOpen}
        />
        <RatingsTable
          onEditClick={handleEditRatingClick}
          onDeleteClick={handleDeleteRatingClick}
        />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => setRatingsModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        <PageHeading title="Szablony raportów" />
        <ReportTemplatesFormModal
          current={currentReportTemplate}
          onClose={() => {
            setCurrentReportTemplate(null);
            setTemplateModalOpen(false);
          }}
          open={isTemplateModalOpen}
        />
        <ReportTemplatesTable
          onEditClick={handleEditTemplateClick}
          onDeleteClick={handleDeleteTemplateClick}
        />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => setTemplateModalOpen(true)}
        >
          <AddIcon />
        </Fab>
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

const useStyles = makeStyles(() => ({
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
}));
