import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  TableRow,
} from '@material-ui/core';
import ClubsTableRow from './ClubsTableRow';
import TablePaginationActions from '../../common/Table/TablePaginationActions';
import useStyles from '../styles';
import { clubsHeadCells } from '../data';
import TableHeader from '../../common/Table/TableHeader';
import useTable from '../../../hooks/useTable';
import {
  ClubsData,
  GetClubs,
  ClubsFilterData,
  Club,
} from '../../../types/clubs';

type TableProps = {
  getClubs: GetClubs;
  clubsData: ClubsData;
  filters: ClubsFilterData;
  deleteClub: (id: string) => void;
  handleSetCurrent: (club: Club) => void;
};

const ClubsTable = ({
  getClubs,
  clubsData,
  filters,
  deleteClub,
  handleSetCurrent,
}: TableProps) => {
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

  useEffect(() => {
    getClubs(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHeader
          headCells={clubsHeadCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
        />
        <TableBody>
          {clubsData.data.map((club) => {
            const { _id } = club;

            return (
              <ClubsTableRow
                key={_id}
                club={club}
                deleteClub={deleteClub}
                handleSetCurrent={handleSetCurrent}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={8}
              count={clubsData.total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ClubsTable;
