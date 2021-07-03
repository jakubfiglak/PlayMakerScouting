import React from 'react';
// MUI components
import { makeStyles, Theme, Typography } from '@material-ui/core';
// MUI icons
import { ExpandMore as AccordionIcon } from '@material-ui/icons';
// Custom components
import { Loader } from '../../components/Loader';
import { ReportBackgroundImageSelect } from '../../components/selects/ReportBackgroundImageSelect';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useSettingsState } from '../../context/settings/useSettingsState';
import { useReportBackgroundImages } from '../../hooks/reportBackgroundImages';

export const SettingsPage = () => {
  const classes = useStyles();

  const {
    defaultReportBackgroundImageUrl,
    defaultReportTemplateId,
    setDefaultReportBackgroundImageUrl,
    setDefaultReportTemplateId,
  } = useSettingsState();
  const {
    data: reportBackgroundImages,
    isLoading: backgroundImagesLoading,
  } = useReportBackgroundImages();

  return (
    <MainTemplate>
      {backgroundImagesLoading && <Loader />}
      <PageHeading title="Ustawienia" />
      <Typography variant="h6" component="h3" className={classes.title}>
        Domyślne tło wydruku raportu
      </Typography>
      <ReportBackgroundImageSelect
        reportBackgroundImages={reportBackgroundImages || []}
        value={defaultReportBackgroundImageUrl}
        onChange={setDefaultReportBackgroundImageUrl}
      />
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: theme.palette.error.main,
  },
  accordionTitle: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: '1rem',
    marginBottom: theme.spacing(2),
  },
}));
