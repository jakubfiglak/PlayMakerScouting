import React, { useEffect, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import {
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import {
  ExpandMore as ExpandMoreIcon,
  Print as PrintIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
// Assets
import background from '../../assets/report_background.png';
// Custom components
import { ReportMatchStats } from './ReportMatchStats';
import { ReportBasicInfo } from './ReportBasicInfo';
import { ReportSummary } from './ReportSummary';
import { PrinteableReport } from './PrinteableReport';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useReportsState } from '../../context/reports/useReportsState';
// Utils & data
import { groupSkillsByCategory } from '../../utils/groupSkillsByCategory';
import { SkillsAccordion } from './SkillsAccordion';
import { SkillsCategories } from '../../types/ratings';

type ParamTypes = {
  id: string;
};

export const ReportPage = () => {
  const params = useParams<ParamTypes>();
  const ref = useRef<HTMLDivElement | null>(null);

  const classes = useStyles();

  const { loading, getReport, reportData, setCurrent } = useReportsState();

  const { id } = params;

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    bodyClass: classes.pageBody,
    documentTitle: `PlaymakerReport_${id}`,
  });

  useEffect(() => {
    getReport(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MainTemplate>
      {loading && <Loader />}
      {reportData && (
        <>
          <div className={classes.headerContainer}>
            <Button
              to="/reports"
              component={RouterLink}
              variant="contained"
              color="primary"
              className={classes.link}
            >
              Wróć do listy raportów
            </Button>
            <PageHeading title={`Raport nr ${reportData.docNumber}`} />
            <div className={classes.buttonsContainer}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
              >
                Drukuj
              </Button>
              <Button
                to={{ pathname: '/reports', state: { setActiveTab: 1 } }}
                component={RouterLink}
                variant="contained"
                color="primary"
                onClick={() => setCurrent(reportData)}
                startIcon={<EditIcon />}
              >
                Edytuj
              </Button>
            </div>
          </div>
          <Card className={classes.card}>
            <CardContent>
              <ReportBasicInfo
                player={reportData.player}
                match={reportData.match}
                scout={reportData.scout}
                order={reportData.order}
                createdAt={reportData.createdAt}
              />
            </CardContent>
          </Card>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="basic-data-content"
              id="basic-data-header"
            >
              <Typography>Dane podstawowe</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ReportMatchStats
                minutesPlayed={reportData.minutesPlayed}
                assists={reportData.assists}
                goals={reportData.goals}
                yellowCards={reportData.yellowCards}
                redCards={reportData.redCards}
              />
            </AccordionDetails>
          </Accordion>
          {Object.entries(groupSkillsByCategory(reportData.skills)).map(
            ([key, value]) => (
              <SkillsAccordion
                key={key}
                category={key as SkillsCategories}
                skills={value || []}
                maxRatingScore={reportData.maxRatingScore}
              />
            ),
          )}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="report-summary-content"
              id="report-summary-header"
            >
              <Typography>Podsumowanie</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <ReportSummary
                summary={reportData.summary}
                finalRating={reportData.finalRating}
                avgRating={reportData.avgRating}
                skills={reportData.skills}
                maxRatingScore={reportData.maxRatingScore}
              />
            </AccordionDetails>
          </Accordion>
          <div className={classes.print}>
            <div ref={ref}>
              <PrinteableReport report={reportData} />
            </div>
          </div>
        </>
      )}
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
  link: {
    marginBottom: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(2, 0),
  },
  print: {
    overflow: 'hidden',
    height: 0,
  },
  accordionDetails: {
    flexDirection: 'column',
  },
  pageBody: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
}));
