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
