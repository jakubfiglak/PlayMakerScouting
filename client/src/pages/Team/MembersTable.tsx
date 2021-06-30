import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { Tooltip, IconButton, Link, makeStyles } from '@material-ui/core';
// MUI icons
import { Delete as DeleteIcon, Search as SearchIcon } from '@material-ui/icons';
// Custom components
import { SimpleTable } from '../../components/table/SimpleTable';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { Loader } from '../../components/Loader';
// Types
import { Team } from '../../types/teams';
import { User } from '../../types/auth';

type Props = {
  users: User[];
};

const headCells = [
  { id: 'lastName', label: 'Nazwisko' },
  { id: 'firstName', label: 'Imię' },
  { id: 'city', label: 'Miasto' },
  { id: 'voivodeship', label: 'Województwo' },
];

export const MembersTable = ({ users }: Props) => {
  return (
    <SimpleTable actions headCells={headCells}>
      {users.map((user) => (
        <StyledTableRow key={user.id}>
          <StyledTableCell padding="checkbox">
            <Tooltip title="Usuń członka">
              <IconButton
                aria-label="delete"
                onClick={() => console.log('hello')}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
          <StyledTableCell>{user.lastName}</StyledTableCell>
          <StyledTableCell>{user.firstName}</StyledTableCell>
          <StyledTableCell>{user.city ? user.city : '-'}</StyledTableCell>
          <StyledTableCell>
            {user.voivodeship ? user.voivodeship : '-'}
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </SimpleTable>
  );
};
