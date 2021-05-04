import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link, makeStyles } from '@material-ui/core';
// MUI icons
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Print as PrintIcon,
} from '@material-ui/icons';
// Custom components
import { FinalRatingChip } from './FinalRatingChip';
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Report } from '../../types/reports';
import { CommonTableProps } from '../../types/common';
// Utils & data
import { formatDate } from '../../utils/dates';

type Props = {
  reports: Report[];
  handleEditClick: (report: Report) => void;
  handlePrintClick: (report: Report) => void;
} & CommonTableProps;

const headCells = [
  { id: 'player', label: 'Zawodnik' },
  { id: 'scout', label: 'Scout' },
  { id: 'createdAt', label: 'Data utworzenia' },
  { id: 'avgRating', label: 'Średnia ocena' },
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
  handleEditClick,
  handlePrintClick,
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
          id: _id,
          player,
          scout,
          createdAt,
          avgRating,
          finalRating,
        } = report;

        return (
          <StyledTableRow key={_id}>
            <StyledTableCell padding="checkbox">
              <div className={classes.buttonsContainer}>
                <Tooltip title="Zobacz szczegóły">
                  <Link component={RouterLink} to={`/reports/${_id}`}>
                    <IconButton aria-label="go to order">
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Edytuj">
                  <IconButton
                    aria-label="edit report"
                    onClick={() => handleEditClick(report)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Drukuj">
                  <IconButton
                    aria-label="print report"
                    onClick={() => handlePrintClick(report)}
                  >
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </StyledTableCell>
            <StyledTableCell>{`${player.firstName} ${player.lastName}`}</StyledTableCell>
            <StyledTableCell>
              {`${scout.firstName} ${scout.lastName}`}
            </StyledTableCell>
            <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
            <StyledTableCell align="right">
              {`${avgRating.toFixed(1)}%`}
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
