import React, { useEffect } from 'react';
// MUI components
import { Typography, Grid } from '@material-ui/core';
// Custom components
import { ReportHeaderCard } from './ReportHeaderCard';
import { BasicReportData } from './BasicReportData';
import { SkillsAccordion } from './SkillsAccordion';
import { MotorSkillsAccordion } from './MotorSkillsAccordion';
import { ReportSummaryAccordion } from './ReportSummaryAccordion';
import { Loader } from '../common';
// Hooks
import { useReportsState } from '../../context';

type ReportDetailsProps = {
  id: string;
};

export const ReportDetails = ({ id }: ReportDetailsProps) => {
  const reportsContext = useReportsState();

  const { getReport, reportData, loading } = reportsContext;

  useEffect(() => {
    getReport(id);
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Raport z obserwacji nr {reportData?.docNumber}
          </Typography>
        </Grid>
        {reportData && (
          <>
            <Grid item xs={12}>
              <ReportHeaderCard
                player={reportData.player}
                match={reportData.match}
                scout={reportData.scout}
                order={reportData.order}
                createdAt={reportData.createdAt}
              />
            </Grid>
            <Grid item xs={12}>
              <BasicReportData
                minutesPlayed={reportData.minutesPlayed}
                assists={reportData.assists}
                goals={reportData.goals}
                yellowCards={reportData.yellowCards}
                redCards={reportData.redCards}
              />
              <SkillsAccordion
                skills={reportData.individualSkills}
                id="individual-skills-header"
                title="Ocena umiejętności indywidualnych"
              />
              <SkillsAccordion
                skills={reportData.teamplaySkills}
                id="teamplay-skills-header"
                title="Ocena współdziałania z partnerami"
              />
              <MotorSkillsAccordion skills={reportData.motorSkills} />
              <ReportSummaryAccordion
                summary={reportData.summary}
                finalRating={reportData.finalRating}
                individualAvg={reportData.individualAvg}
                teamplayAvg={reportData.teamplayAvg}
                avgRating={reportData.avgRating}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
