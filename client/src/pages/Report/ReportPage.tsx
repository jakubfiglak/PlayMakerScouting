import { useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// MUI icons
import { Print as PrintIcon, Edit as EditIcon } from '@material-ui/icons';
// Custom components
import { ReportMatchStats } from './ReportMatchStats';
import { ReportBasicInfo } from './ReportBasicInfo';
import { ReportSummary } from './ReportSummary';
import { ReportCard } from './ReportCard';
import { ExtraPlayerInfo } from './ExtraPlayerInfo';
import { MatchInfo } from './MatchInfo';
import { PrinteableReport } from './PrinteableReport';
import { Ratings } from './Ratings';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useReport } from '../../hooks/reports';
import { useSettingsState } from '../../context/settings/useSettingsState';

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
          <div className={classes.cardsContainer}>
            <ReportCard title="Informacje podstawowe">
              <ReportBasicInfo report={report} />
            </ReportCard>
            <ReportCard title="Szczególy dot. meczu">
              <MatchInfo
                match={report.match}
                videoURL={report.videoURL}
                videoDescription={report.videoDescription}
              />
            </ReportCard>
            <ReportCard title="Szczególy dot. występu">
              <ExtraPlayerInfo
                positionPlayed={report.positionPlayed}
                shirtNo={report.shirtNo}
              />
            </ReportCard>
            <ReportCard title="Statystyki">
              <ReportMatchStats
                minutesPlayed={report.minutesPlayed}
                assists={report.assists}
                goals={report.goals}
                yellowCards={report.yellowCards}
                redCards={report.redCards}
              />
            </ReportCard>
          </div>
          <Ratings
            skills={report.skills}
            maxRatingScore={report.maxRatingScore}
          />
          <ReportCard title="Podsumowanie">
            <ReportSummary
              summary={report.summary}
              finalRating={report.finalRating}
              avgRating={report.avgRating}
              skills={report.skills}
              maxRatingScore={report.maxRatingScore}
              percentageRating={report.percentageRating}
            />
          </ReportCard>
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
  cardsContainer: {
    marginTop: theme.spacing(2),
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: `${theme.spacing(2)}px`,
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
