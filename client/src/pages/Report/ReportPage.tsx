import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import {
  Grid,
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
import { MainTemplate } from '../../templates/MainTemplate';
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
    <MainTemplate>
      {loading && <Loader />}
      {reportData && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.headerContainer}>
                <Typography variant="h6">
                  Raport z obserwacji nr {reportData._id}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                >
                  Drukuj
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Card>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
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
    gap: `${theme.spacing(2)}px`,
  },
  print: {
    overflow: 'hidden',
    height: 0,
  },
  accordionDetails: {
    flexDirection: 'column',
  },
}));
