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
import { Loader } from '../../components/Loader';
// Hooks
import { useUsers } from '../../hooks/users';
import { useTable } from '../../hooks/useTable';
// Types
import { Player } from '../../types/players';
import { CommonTableProps } from '../../types/common';
import { UserFilterData } from '../../types/users';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = { filters: UserFilterData };

const headCells = [
  { id: 'lastName', label: 'Nazwisko' },
  { id: 'firstName', label: 'Imię' },
  { id: 'email', label: 'E-Mail' },
  { id: 'role', label: 'Rola' },
  { id: 'voivodeship', label: 'Województwo' },
  { id: 'city', label: 'Miasto' },
];

export const UsersTable = ({ filters }: Props) => {
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
          {data.docs.map(
            ({ id, lastName, firstName, voivodeship, city, role, email }) => (
              <StyledTableRow key={id}>
                <StyledTableCell padding="checkbox">
                  <div className={classes.buttonsContainer}>
                    <Tooltip title="Zobacz profil">
                      <Link component={RouterLink} to={`/users/${id}`}>
                        <IconButton aria-label="go to users profile">
                          <SearchIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Edytuj">
                      <IconButton
                        aria-label="edit"
                        onClick={() => console.log('hello')}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </StyledTableCell>
                <StyledTableCell>{lastName}</StyledTableCell>
                <StyledTableCell>{firstName}</StyledTableCell>
                <StyledTableCell>{email}</StyledTableCell>
                <StyledTableCell>{role}</StyledTableCell>
                <StyledTableCell>
                  {voivodeship ? getLabel(voivodeship) : '-'}
                </StyledTableCell>
                <StyledTableCell>{city || '-'}</StyledTableCell>
              </StyledTableRow>
            ),
          )}
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
