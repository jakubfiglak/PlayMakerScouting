import { FC } from 'react';
// Custom components
import { Table } from '../../components/table/Table';
// Types
import { CommonTableProps } from '../../types/common';

type Props = CommonTableProps;

const headCells = [
  { id: 'player', label: 'Zawodnik' },
  { id: 'scout', label: 'Scout' },
  { id: 'createdAt', label: 'Data utworzenia' },
  { id: 'status', label: 'Status' },
  { id: 'avgRating', label: 'Śr. ocena' },
  { id: 'maxRatingScore', label: 'Skala ocen' },
  { id: 'percentageRating', label: 'Ocena %' },
  { id: 'finalRating', label: 'Ocena ostateczna' },
  { id: 'video', label: 'Video', sortingDisabled: true },
];

export const ReportsTable: FC<Props> = ({
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
