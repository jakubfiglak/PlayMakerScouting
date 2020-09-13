import { ChangeEvent } from 'react';

export type Order = 'asc' | 'desc';

export type PaginationData = {
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

export type Voivodeship =
  | ''
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

export type Location = {
  type: string;
  coordinates: number[];
};

export type Address = {
  street: string;
  streetNo: string;
  zipCode: string;
  city: string;
  voivodeship?: Voivodeship;
  country: string;
};

export type OnChangeFn = (
  e: ChangeEvent<
    | HTMLInputElement
    | {
        name?: string | undefined;
        value: unknown;
      }
  >,
) => void;
