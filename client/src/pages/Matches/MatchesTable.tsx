import { FC } from 'react';
// Custom components
import { Table } from '../../components/table/Table';
// Types
import { CommonTableProps } from '../../types/common';

type Props = CommonTableProps;

const headCells = [
  { id: 'homeTeam', label: 'Gospodarz' },
  { id: 'awayTeam', label: 'Gość' },
  { id: 'competition', label: 'Rozgrywki' },
  { id: 'date', label: 'Data' },
  { id: 'result', label: 'Wynik', sortingDisabled: true },
  { id: 'video', label: 'Video', sortingDisabled: true },
];

export const MatchesTable: FC<Props> = ({
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
