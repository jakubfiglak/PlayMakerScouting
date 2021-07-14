import { makeStyles, Theme, Typography } from '@material-ui/core';
// Custom components
import { MainTemplate } from '../../templates/MainTemplate';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { ReportBackgroundImageSelect } from '../../components/selects/ReportBackgroundImageSelect';
import { ReportTemplatesSelect } from '../../components/selects/ReportTemplatesSelect';
// Hooks
import { useSettingsState } from '../../context/settings/useSettingsState';
import { useReportBackgroundImages } from '../../hooks/reportBackgroundImages';
import { useReportTemplates } from '../../hooks/reportTemplates';

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
  const {
    data: reportTemplates,
    isLoading: reportTemplatesLoading,
  } = useReportTemplates();

  return (
    <MainTemplate>
      {(backgroundImagesLoading || reportTemplatesLoading) && <Loader />}
      <PageHeading title="Ustawienia" />
      <Typography variant="h6" component="h3" className={classes.title}>
        Domyślne tło wydruku raportu
      </Typography>
      <ReportBackgroundImageSelect
        reportBackgroundImages={reportBackgroundImages || []}
        value={defaultReportBackgroundImageUrl}
        onChange={setDefaultReportBackgroundImageUrl}
      />
      <Typography variant="h6" component="h3" className={classes.title}>
        Domyślny szablon raportu
      </Typography>
      <ReportTemplatesSelect
        reportTemplates={reportTemplates || []}
        value={defaultReportTemplateId}
        onChange={setDefaultReportTemplateId}
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
    margin: theme.spacing(2, 0),
  },
}));
