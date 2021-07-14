import { useLocalStorage } from './useLocalStorage';
import { SortingOrder } from '../types/common';

type TableSettings = {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  order: SortingOrder;
};

export function useTable(key: string) {
  const [tableSettings, setTableSettings] = useLocalStorage<TableSettings>({
    key,
    initialValue: {
      page: 0,
      rowsPerPage: 20,
      sortBy: '_id',
      order: 'desc',
    },
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setTableSettings({
      ...tableSettings,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTableSettings({
      ...tableSettings,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleSort = (id: string) => {
    const isAsc = tableSettings.sortBy === id && tableSettings.order === 'asc';
    setTableSettings({
      ...tableSettings,
      page: 0,
      sortBy: id,
      order: isAsc ? 'desc' : 'asc',
    });
  };

  return {
    tableSettings,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  };
}
