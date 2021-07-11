import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Search as SearchIcon,
  Edit as EditIcon,
  Print as PrintIcon,
  Lock as CloseIcon,
  LockOpen as OpenIcon,
} from '@material-ui/icons';
// Custom components
import { FinalRatingChip } from './FinalRatingChip';
import { StatusChip } from './StatusChip';
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [isPrintActive, setPrintActive] = useState(false);
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
    documentTitle: 'PlaymakerReport',
    onAfterPrint: () => setPrintActive(false),
  }) as () => void;

  function onPrintClick() {
    setPrintActive(true);
    setTimeout(() => handlePrint(), 100);
  }

  return (
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
          <StyledTableRow key={id}>
            <StyledTableCell padding="checkbox">
              <div className={classes.buttonsContainer}>
                <Tooltip title="Zobacz szczegóły">
                  <Link component={RouterLink} to={`/reports/${id}`}>
                    <IconButton aria-label="go to report">
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                {onEditClick ? (
                  <Tooltip title="Edytuj">
                    <IconButton
                      aria-label="edit report"
                      onClick={() => onEditClick(report)}
                      disabled={status === 'closed'}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Tooltip title="Drukuj">
                  <IconButton aria-label="print report" onClick={onPrintClick}>
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
                {status === 'in-prep' ? (
                  <Tooltip title="Zamknij raport">
                    <IconButton
                      aria-label="close report"
                      onClick={() => setReportStatus({ id, status: 'closed' })}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Otwórz raport">
                    <IconButton
                      aria-label="open report"
                      onClick={() => setReportStatus({ id, status: 'in-prep' })}
                    >
                      <OpenIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <Link
                component={RouterLink}
                to={`/players/${player.id}`}
              >{`${player.firstName} ${player.lastName}`}</Link>
            </StyledTableCell>
            <StyledTableCell>
              {isAdmin ? (
                <Link component={RouterLink} to={`/users/${scout.id}`}>
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
            {isPrintActive ? (
              <StyledTableCell>
                <div className={classes.print}>
                  <div ref={ref}>
                    <PrinteableReport report={report} />
                  </div>
                </div>
              </StyledTableCell>
            ) : null}
          </StyledTableRow>
        );
      })}
    </Table>
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
