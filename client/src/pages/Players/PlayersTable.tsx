import { FC } from 'react';
// Custom components
import { Table } from '../../components/table/Table';
// Types
import { CommonTableProps } from '../../types/common';

type Props = CommonTableProps;

const headCells = [
  { id: 'lastName', label: 'Imię i nazwisko' },
  { id: 'club', label: 'Klub' },
  { id: 'position', label: 'Pozycja' },
  { id: 'yearOfBirth', label: 'Rok urodzenia' },
  { id: 'footed', label: 'Noga' },
  { id: 'reportsCount', label: 'Raporty', sortingDisabled: true },
];

export const PlayersTable: FC<Props> = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  actions,
  children,
}) => {
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
      {children}
    </Table>
  );
};
