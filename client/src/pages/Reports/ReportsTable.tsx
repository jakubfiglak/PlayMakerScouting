import { useRef, useState } from 'react';
import * as React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import {
  IconButton,
  Tooltip,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import {
  Edit as EditIcon,
  Print as PrintIcon,
  Lock as CloseIcon,
  LockOpen as OpenIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
// Custom components
import { FinalRatingChip } from './FinalRatingChip';
import { StatusChip } from './StatusChip';
import { ReportDeleteConfirmationModal } from './ReportDeleteConfirmationModal';
import { PrinteableReport } from '../Report/PrinteableReport';
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { Loader } from '../../components/Loader';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useSettingsState } from '../../context/settings/useSettingsState';
import { useSetReportStatus } from '../../hooks/reports';
// Types
import { Report } from '../../types/reports';
import { CommonTableProps } from '../../types/common';
// Utils & data
import { formatDate } from '../../utils/dates';

type Props = {
  reports: Report[];
  onEditClick?: (report: Report) => void;
} & CommonTableProps;

const headCells = [
  { id: 'player', label: 'Zawodnik' },
  { id: 'scout', label: 'Scout' },
  { id: 'createdAt', label: 'Data utworzenia' },
  { id: 'status', label: 'Status' },
  { id: 'avgRating', label: 'Śr. ocena' },
  { id: 'maxRatingScore', label: 'Skala ocen' },
  { id: 'percentageRating', label: 'Ocena %' },
  { id: 'finalRating', label: 'Ocena ostateczna' },
];

export const ReportsTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  reports,
  onEditClick,
}: Props) => {
  const history = useHistory();
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [
    isDeleteReportConfirmationModalOpen,
    setDeleteReportConfirmationModalOpen,
  ] = useState(false);
  const { defaultReportBackgroundImageUrl } = useSettingsState();

  const classes = useStyles({ background: defaultReportBackgroundImageUrl });
  const user = useAuthenticatedUser();

  const isAdmin = user.role === 'admin';

  const {
    mutate: setReportStatus,
    isLoading: setStatusLoading,
  } = useSetReportStatus();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    bodyClass: classes.pageBody,
    documentTitle: 'Report',
    onAfterPrint: () => setCurrentReport(null),
  }) as () => void;

  function onPrintClick(report: Report) {
    setCurrentReport(report);
    setTimeout(() => handlePrint(), 100);
  }

  function handleDeleteReportClick(report: Report) {
    setCurrentReport(report);
    setDeleteReportConfirmationModalOpen(true);
  }

  return (
    <>
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={total}
        headCells={headCells}
        actions
      >
        {setStatusLoading && <Loader />}
        {reports.map((report) => {
          const {
            id,
            player,
            scout,
            createdAt,
            avgRating,
            maxRatingScore,
            percentageRating,
            finalRating,
            status,
          } = report;

          return (
            <StyledTableRow
              key={id}
              hover
              onClick={() => history.push(`/reports/${report.id}`)}
            >
              <StyledTableCell padding="checkbox">
                <div className={classes.buttonsContainer}>
                  {onEditClick ? (
                    <Tooltip title="Edytuj">
                      <IconButton
                        aria-label="edit report"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditClick(report);
                        }}
                        disabled={status === 'closed'}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                  <Tooltip title="Drukuj">
                    <IconButton
                      aria-label="print report"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrintClick(report);
                      }}
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                  {status === 'in-prep' ? (
                    <Tooltip title="Zamknij raport">
                      <IconButton
                        aria-label="close report"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReportStatus({ id, status: 'closed' });
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Otwórz raport">
                      <IconButton
                        aria-label="open report"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReportStatus({ id, status: 'in-prep' });
                        }}
                      >
                        <OpenIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Usuń">
                    <IconButton
                      aria-label="delete report"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReportClick(report);
                      }}
                      disabled={!isAdmin && scout.id !== user.id}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <Link
                  component={RouterLink}
                  to={`/players/${player.id}`}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >{`${player.firstName} ${player.lastName}`}</Link>
              </StyledTableCell>
              <StyledTableCell>
                {isAdmin ? (
                  <Link
                    component={RouterLink}
                    to={`/users/${scout.id}`}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    {`${scout.firstName} ${scout.lastName}`}
                  </Link>
                ) : (
                  <>{`${scout.firstName} ${scout.lastName}`}</>
                )}
              </StyledTableCell>
              <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
              <StyledTableCell>
                <StatusChip status={status} />
              </StyledTableCell>
              <StyledTableCell>{avgRating.toFixed(2)}</StyledTableCell>
              <StyledTableCell>{maxRatingScore}</StyledTableCell>
              <StyledTableCell>
                {`${percentageRating.toFixed(1)}%`}
              </StyledTableCell>
              <StyledTableCell>
                <FinalRatingChip finalRating={finalRating} />
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </Table>
      <ReportDeleteConfirmationModal
        open={isDeleteReportConfirmationModalOpen}
        report={currentReport}
        handleClose={() => {
          setCurrentReport(null);
          setDeleteReportConfirmationModalOpen(false);
        }}
      />
      {currentReport ? (
        <div className={classes.print}>
          <div ref={ref}>
            <PrinteableReport report={currentReport} />
          </div>
        </div>
      ) : null}
    </>
  );
};

type StyleProps = {
  background: string;
};

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  buttonsContainer: {
    display: 'flex',
  },
  print: {
    overflow: 'hidden',
    height: 0,
  },
  pageBody: (props) => ({
    backgroundImage: `url(${props.background})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
}));
