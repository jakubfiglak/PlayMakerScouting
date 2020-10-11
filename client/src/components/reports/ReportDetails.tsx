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

  const { getReport, current, loading } = reportsContext;

  useEffect(() => {
    getReport(id);
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Raport z obserwacji nr {current?.docNumber}
          </Typography>
        </Grid>
        {current && (
          <>
            <Grid item xs={12}>
              <ReportHeaderCard
                player={current.player}
                match={current.match}
                scout={current.scout}
                order={current.order}
                createdAt={current.createdAt}
              />
            </Grid>
            <Grid item xs={12}>
              <BasicReportData
                minutesPlayed={current.minutesPlayed}
                assists={current.assists}
                goals={current.goals}
                yellowCards={current.yellowCards}
                redCards={current.redCards}
              />
              <SkillsAccordion
                skills={current.individualSkills}
                id="individual-skills-header"
                title="Ocena umiejętności indywidualnych"
              />
              <SkillsAccordion
                skills={current.teamplaySkills}
                id="teamplay-skills-header"
                title="Ocena współdziałania z partnerami"
              />
              <MotorSkillsAccordion skills={current.motorSkills} />
              <ReportSummaryAccordion
                summary={current.summary}
                finalRating={current.finalRating}
                individualAvg={current.individualAvg}
                teamplayAvg={current.teamplayAvg}
                avgRating={current.avgRating}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
