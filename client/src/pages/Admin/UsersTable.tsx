import React from 'react';
import { useHistory } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from '@material-ui/icons/';
// Custom components
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
import { Loader } from '../../components/Loader';
// Hooks
import { useUsers } from '../../hooks/users';
import { useTable } from '../../hooks/useTable';
// Types
import { UserFilterData } from '../../types/users';
import { User, UserRole } from '../../types/auth';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  filters: UserFilterData;
  onAssignRoleClick: (user: User) => void;
};

const headCells = [
  { id: 'lastName', label: 'Nazwisko' },
  { id: 'firstName', label: 'Imię' },
  { id: 'email', label: 'E-Mail' },
  { id: 'role', label: 'Rola' },
  { id: 'voivodeship', label: 'Województwo' },
  { id: 'city', label: 'Miasto' },
];

function isPlaymakerScout(role: UserRole) {
  return role === 'playmaker-scout';
}

export const UsersTable = ({ filters, onAssignRoleClick }: Props) => {
  const history = useHistory();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('usersTable');

  const { data, isLoading } = useUsers({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });

  return (
    <>
      {isLoading && <Loader />}
      {data ? (
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={data.totalDocs}
          headCells={headCells}
          actions
        >
          {data.docs.map((user) => (
            <StyledTableRow
              key={user.id}
              hover
              onClick={() => history.push(`/users/${user.id}`)}
            >
              <StyledTableCell padding="checkbox">
                <Tooltip
                  title={
                    isPlaymakerScout(user.role)
                      ? 'Nadaj rolę scout'
                      : 'Nadaj rolę playmaker-scout'
                  }
                >
                  <IconButton
                    aria-label="change role"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssignRoleClick(user);
                    }}
                    disabled={user.role === 'admin'}
                  >
                    {isPlaymakerScout(user.role) ? <DownIcon /> : <UpIcon />}
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>{user.lastName}</StyledTableCell>
              <StyledTableCell>{user.firstName}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.role}</StyledTableCell>
              <StyledTableCell>
                {user.voivodeship ? getLabel(user.voivodeship) : '-'}
              </StyledTableCell>
              <StyledTableCell>{user.city || '-'}</StyledTableCell>
            </StyledTableRow>
          ))}
        </Table>
      ) : null}
    </>
  );
};
