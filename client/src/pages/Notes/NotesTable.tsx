import { FC } from 'react';
// Custom components
import { Table } from '../../components/table/Table';
// Types
import { CommonTableProps } from '../../types/common';

type Props = CommonTableProps;

const headCells = [
  { id: 'player', label: 'Zawodnik' },
  { id: 'percentageRating', label: 'Ocena' },
  { id: 'match', label: 'Mecz' },
  { id: 'author', label: 'Skaut' },
  { id: 'createdAt', label: 'Data utworzenia' },
];

export const NotesTable: FC<Props> = ({
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
      collapsible
    >
      {children}
    </Table>
  );
};
