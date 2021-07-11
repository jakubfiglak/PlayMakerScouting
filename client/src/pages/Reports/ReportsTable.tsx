import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link, makeStyles } from '@material-ui/core';
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
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Report } from '../../types/reports';
import { CommonTableProps } from '../../types/common';
import { SetReportStatusArgs } from '../../hooks/reports';
// Utils & data
import { formatDate } from '../../utils/dates';

type Props = {
  reports: Report[];
  onEditClick?: (report: Report) => void;
  onPrintClick: (report: Report) => void;
  onSetStatusClick: ({ id, status }: SetReportStatusArgs) => void;
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
  onPrintClick,
  onSetStatusClick,
}: Props) => {
  const classes = useStyles();

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
                  <IconButton
                    aria-label="print report"
                    onClick={() => onPrintClick(report)}
                  >
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
                {status === 'in-prep' ? (
                  <Tooltip title="Zamknij raport">
                    <IconButton
                      aria-label="close report"
                      onClick={() => onSetStatusClick({ id, status: 'closed' })}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Otwórz raport">
                    <IconButton
                      aria-label="open report"
                      onClick={() =>
                        onSetStatusClick({ id, status: 'in-prep' })
                      }
                    >
                      <OpenIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </StyledTableCell>
            <StyledTableCell>{`${player.firstName} ${player.lastName}`}</StyledTableCell>
            <StyledTableCell>
              {`${scout.firstName} ${scout.lastName}`}
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
  );
};

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
