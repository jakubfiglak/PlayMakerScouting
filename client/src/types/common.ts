import { ChangeEvent } from 'react';
import { countries } from '../utils/countries';

export type SortingOrder = 'asc' | 'desc';

export type PaginatedData<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type GetPaginatedDataArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
};

export type Voivodeship =
  | 'Zachodniopomorskie'
  | 'Lubuskie'
  | 'Dolnośląskie'
  | 'Wielkopolskie'
  | 'Pomorskie'
  | 'Kujawsko-Pomorskie'
  | 'Łódzkie'
  | 'Opolskie'
  | 'Śląskie'
  | 'Małopolskie'
  | 'Podkarpackie'
  | 'Lubelskie'
  | 'Mazowieckie'
  | 'Warmińsko-Mazurskie'
  | 'Podlaskie'
  | 'Świętokrzyskie';

export type CommonTableProps = {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  order: SortingOrder;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSort: (id: string) => void;
  total: number;
  actions?: boolean;
  collapsible?: boolean;
};

export interface ApiError extends Error {
  response: {
    data: {
      error: string;
      success: boolean;
    };
  };
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Country = keyof typeof countries;
