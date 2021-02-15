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
} from '@material-ui/icons';
// Custom components
import { ReportMatchStats } from './ReportMatchStats';
import { ReportMotorSkills } from './ReportMotorSkills';
import { ReportBasicInfo } from './ReportBasicInfo';
import { ReportSummary } from './ReportSummary';
import { ReportSkills } from './ReportSkills';
import { PrinteableReport } from './PrinteableReport';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
// Hooks
import { useReportsState } from '../../context/reports/useReportsState';

type ParamTypes = {
  id: string;
};

export const ReportPage = () => {
  const params = useParams<ParamTypes>();
  const ref = useRef<HTMLDivElement | null>(null);

  const classes = useStyles();

  const { loading, getReport, reportData } = useReportsState();

  const { id } = params;

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: `PlaymakerReport_${id}`,
  });

  useEffect(() => {
    getReport(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
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
            <PageHeading title={`Raport nr ${reportData._id}`} />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Drukuj
            </Button>
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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="individual-skills-header"
            >
              <Typography>Ocena umiejętności indywidualnych</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ReportSkills skills={reportData.individualSkills} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="teamplay-skills-header"
            >
              <Typography>Ocena współdziałania z partnerami</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ReportSkills skills={reportData.teamplaySkills} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="motor-skills-header"
            >
              <Typography>Ocena cech motorycznych</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ReportMotorSkills skills={reportData.motorSkills} />
            </AccordionDetails>
          </Accordion>
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
                individualAvg={reportData.individualAvg}
                teamplayAvg={reportData.teamplayAvg}
                avgRating={reportData.avgRating}
                individualSkills={reportData.individualSkills}
                teamplaySkills={reportData.teamplaySkills}
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
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
}));
