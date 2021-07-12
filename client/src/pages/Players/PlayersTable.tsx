import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link, makeStyles } from '@material-ui/core';
// MUI icons
import { Edit as EditIcon, Search as SearchIcon } from '@material-ui/icons/';
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
      {players.map((player) => (
        <StyledTableRow key={player.id}>
          <StyledTableCell padding="checkbox">
            <div className={classes.buttonsContainer}>
              <Tooltip title="Zobacz profil">
                <Link component={RouterLink} to={`/players/${player.id}`}>
                  <IconButton aria-label="go to players profile">
                    <SearchIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              {onEditClick ? (
                <Tooltip title="Edytuj">
                  <IconButton
                    aria-label="edit"
                    onClick={() => onEditClick(player)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <Link component={RouterLink} to={`/players/${player.id}`}>
              {`${player.firstName} ${player.lastName}`}
            </Link>
          </StyledTableCell>
          <StyledTableCell>
            <Link component={RouterLink} to={`/clubs/${player.club.id}`}>
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

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
