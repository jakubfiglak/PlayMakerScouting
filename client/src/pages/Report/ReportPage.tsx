import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// MUI components
import { Grid, Typography } from '@material-ui/core';
// Custom components
import { BasicReportData } from './BasicReportData';
import { MotorSkillsAccordion } from './MotorSkillsAccordion';
import { ReportHeaderCard } from './ReportHeaderCard';
import { ReportSummaryAccordion } from './ReportSummaryAccordion';
import { SkillsAccordion } from './SkillsAccordion';
import { Loader } from '../../components/Loader';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useReportsState } from '../../context/reports/useReportsState';

type ParamTypes = {
  id: string;
};

export const ReportPage = () => {
  const params = useParams<ParamTypes>();
  const { loading, getReport, reportData } = useReportsState();

  const { id } = params;

  useEffect(() => {
    getReport(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MainTemplate>
      {loading && <Loader />}
      {reportData && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Raport z obserwacji nr {reportData._id}
            </Typography>
          </Grid>
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
        </Grid>
      )}
    </MainTemplate>
  );
};
