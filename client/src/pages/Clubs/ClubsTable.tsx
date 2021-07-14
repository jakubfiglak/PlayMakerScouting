import React from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon } from '@material-ui/icons';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { Table } from '../../components/table/Table';
// Types
import { Club } from '../../types/clubs';
import { CommonTableProps } from '../../types/common';

type Props = {
  clubs: Club[];
  onEditClick: (club: Club) => void;
} & CommonTableProps;

const headCells = [
  { id: 'name', label: 'Nazwa' },
  { id: 'division', label: 'Poziom rozgrywkowy' },
  { id: 'voivodeship', label: 'Województwo' },
];

export const ClubsTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  clubs,
  total,
  onEditClick,
  actions,
}: Props) => {
  const history = useHistory();

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
      actions={actions}
    >
      {clubs.map((club) => {
        return (
          <StyledTableRow
            hover
            key={club.id}
            onClick={() => history.push(`/clubs/${club.id}`)}
          >
            <StyledTableCell padding="checkbox">
              <Tooltip title="Edytuj">
                <IconButton
                  aria-label="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(club);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell>{club.name}</StyledTableCell>
            <StyledTableCell>{club.division}</StyledTableCell>
            <StyledTableCell>{club.voivodeship}</StyledTableCell>
          </StyledTableRow>
        );
      })}
    </Table>
  );
};
