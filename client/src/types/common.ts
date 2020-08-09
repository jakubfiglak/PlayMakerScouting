import { ChangeEvent } from 'react';

export type Order = 'asc' | 'desc';

export type Location = {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  street: string;
  city: string;
  voivodeship: string;
  zipcode: string;
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
