import { useState } from 'react';
import { Order } from '../types/common';

// hook for a paginated table with sorting

export const useTable = (sort?: string, sortOrder?: Order) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState(sort || '_id');
  const [order, setOrder] = useState<Order>(sortOrder || 'desc');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (id: string) => {
    setPage(0);
    const isAsc = sortBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSortBy(id);
  };

  return [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] as const;
};
