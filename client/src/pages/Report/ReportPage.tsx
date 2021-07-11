import React, { useRef } from 'react';
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
// Custom components
import { ReportMatchStats } from './ReportMatchStats';
import { ReportBasicInfo } from './ReportBasicInfo';
import { ReportSummary } from './ReportSummary';
import { PrinteableReport } from './PrinteableReport';
import { StatusChip } from '../Reports/StatusChip';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useReport } from '../../hooks/reports';
import { useSettingsState } from '../../context/settings/useSettingsState';
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
  const { defaultReportBackgroundImageUrl } = useSettingsState();

  const classes = useStyles({ background: defaultReportBackgroundImageUrl });

  const { id } = params;

  const { data: report, isLoading } = useReport(id);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    bodyClass: classes.pageBody,
    documentTitle: `PlaymakerReport_${id}`,
  });

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      {report && (
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
            <PageHeading title={`Raport nr ${report.docNumber}`} />
            <div>
              Status: <StatusChip status={report.status} />
            </div>
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
                to={{
                  pathname: '/reports',
                  state: { activeTab: 1, report },
                }}
                component={RouterLink}
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                disabled={report.status === 'closed'}
              >
                Edytuj
              </Button>
            </div>
          </div>
          <Card className={classes.card}>
            <CardContent>
              <ReportBasicInfo
                player={report.player}
                match={report.match}
                scout={report.scout}
                order={report.order}
                playerCurrentClub={report.playerCurrentClub}
                positionPlayed={report.positionPlayed}
                shirtNo={report.shirtNo}
                createdAt={report.createdAt}
              />
            </CardContent>
          </Card>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="basic-data-content"
              id="basic-data-header"
            >
              <Typography>Statystyki</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ReportMatchStats
                minutesPlayed={report.minutesPlayed}
                assists={report.assists}
                goals={report.goals}
                yellowCards={report.yellowCards}
                redCards={report.redCards}
              />
            </AccordionDetails>
          </Accordion>
          {Object.entries(groupSkillsByCategory(report.skills)).map(
            ([key, value]) => (
              <SkillsAccordion
                key={key}
                category={key as SkillsCategories}
                skills={value || []}
                maxRatingScore={report.maxRatingScore}
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
                summary={report.summary}
                finalRating={report.finalRating}
                avgRating={report.avgRating}
                skills={report.skills}
                maxRatingScore={report.maxRatingScore}
                percentageRating={report.percentageRating}
              />
            </AccordionDetails>
          </Accordion>
          <div className={classes.print}>
            <div ref={ref}>
              <PrinteableReport report={report} />
            </div>
          </div>
        </>
      )}
    </MainTemplate>
  );
};

type StyleProps = {
  background: string;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
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
    marginTop: theme.spacing(2),
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
  pageBody: (props) => ({
    backgroundImage: `url(${props.background})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
}));
