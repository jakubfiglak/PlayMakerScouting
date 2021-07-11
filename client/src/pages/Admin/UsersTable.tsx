import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { IconButton, Tooltip, Link, makeStyles } from '@material-ui/core';
// MUI icons
import {
  ArrowUpward as UpIcon,
  Search as SearchIcon,
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
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { User } from '../../types/auth';

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

export const UsersTable = ({ filters, onAssignRoleClick }: Props) => {
  const classes = useStyles();

  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();
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
        >
          {data.docs.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell padding="checkbox">
                <div className={classes.buttonsContainer}>
                  <Tooltip title="Zobacz profil">
                    <Link component={RouterLink} to={`/users/${user.id}`}>
                      <IconButton aria-label="go to users profile">
                        <SearchIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Nadaj rolę playmaker-scout">
                    <IconButton
                      aria-label="assign-playmaker-role"
                      onClick={() => onAssignRoleClick(user)}
                      disabled={user.role !== 'scout'}
                    >
                      <UpIcon />
                    </IconButton>
                  </Tooltip>
                </div>
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

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    display: 'flex',
  },
}));
