import { Order } from '../../../types/common';

export type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
};

export type HeadCell = {
  id: string;
  label: string;
};

export type TableHeaderProps = {
  headCells: HeadCell[];
  sortBy: string;
  order: Order;
  handleSort: (id: string) => void;
};
