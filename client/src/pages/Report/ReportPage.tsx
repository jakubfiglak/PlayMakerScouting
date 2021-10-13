import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// MUI icons
import { Print as PrintIcon } from '@material-ui/icons';
// Custom components
import { ReportMatchStats } from './ReportMatchStats';
import { ReportBasicInfo } from './ReportBasicInfo';
import { ReportSummary } from './ReportSummary';
import { ReportCard } from './ReportCard';
import { ExtraPlayerInfo } from './ExtraPlayerInfo';
import { MatchInfo } from './MatchInfo';
import { PrinteableReport } from './PrinteableReport';
import { Ratings } from './Ratings';
import { EditReportForm } from '../Reports/forms/EditReportForm';
import { SingleAssetPageActions } from '../../components/SingleAssetPageActions';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
// Hooks
import { useReport, useUpdateReport } from '../../hooks/reports';
import { useSettingsState } from '../../context/settings/useSettingsState';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type ParamTypes = {
  id: string;
};

export const ReportPage = () => {
  const params = useParams<ParamTypes>();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEditState, setEditState] = useState(false);
  const { defaultReportBackgroundImageUrl } = useSettingsState();

  const classes = useStyles({ background: defaultReportBackgroundImageUrl });

  const { id } = params;
  const user = useAuthenticatedUser();

  const { data: report, isLoading: reportLoading } = useReport(id);

  const {
    mutate: updateReport,
    isLoading: updateReportLoading,
  } = useUpdateReport(id);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    bodyClass: classes.pageBody,
    documentTitle: `PlaymakerReport_${id}`,
  });

  const isLoading = reportLoading || updateReportLoading;

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <SingleAssetPageActions
          isEditState={isEditState}
          linkText="Wróć do listy raportów"
          linkTo="/reports"
          isEditDisabled={
            !(user.role === 'admin' || user.id === report?.author.id) &&
            report?.status !== 'closed'
          }
          onEditClick={() => setEditState(!isEditState)}
        />
        <PageHeading title={`Raport nr ${report?.docNumber}`} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Drukuj
        </Button>
      </div>
      {report && !isEditState ? (
        <>
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
      ) : null}
      {report && isEditState ? (
        <EditReportForm report={report} onSubmit={updateReport} />
      ) : null}
    </>
  );
};

type StyleProps = {
  background: string;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  cardsContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: `${theme.spacing(2)}px`,
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
