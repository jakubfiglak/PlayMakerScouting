import * as React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon } from '@material-ui/icons/';
// Custom components
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Player } from '../../types/players';
import { CommonTableProps } from '../../types/common';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  players: Player[];
  onEditClick?: (player: Player) => void;
} & CommonTableProps;

const headCells = [
  { id: 'lastName', label: 'Imię i nazwisko' },
  { id: 'club', label: 'Klub' },
  { id: 'position', label: 'Pozycja' },
  { id: 'yearOfBirth', label: 'Rok urodzenia' },
  { id: 'footed', label: 'Noga' },
];

export const PlayersTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  players,
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
      {players.map((player) => (
        <StyledTableRow
          key={player.id}
          hover
          onClick={() => history.push(`/players/${player.id}`)}
        >
          {onEditClick ? (
            <StyledTableCell padding="checkbox">
              <Tooltip title="Edytuj">
                <IconButton
                  aria-label="edit"
                  onClick={() => onEditClick(player)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
          ) : null}
          <StyledTableCell>
            {`${player.firstName} ${player.lastName}`}
          </StyledTableCell>
          <StyledTableCell>
            <Link
              component={RouterLink}
              to={`/clubs/${player.club.id}`}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {player.club.name}
            </Link>
          </StyledTableCell>
          <StyledTableCell>{getLabel(player.position)}</StyledTableCell>
          <StyledTableCell>{player.yearOfBirth}</StyledTableCell>
          <StyledTableCell>{getLabel(player.footed)}</StyledTableCell>
        </StyledTableRow>
      ))}
    </Table>
  );
};
