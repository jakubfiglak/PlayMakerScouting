import { Voivodeship, Country } from './common';
import { groups, divisions } from '../utils/constants';

export type Division = typeof divisions[number];

export type Group = typeof groups[number];

export type Club = {
  id: string;
  name: string;
  country: Country;
  division: Division;
  group?: Group | null;
  voivodeship: Voivodeship | 'Zagranica';
  lnpID?: string;
  author: string;
};

export type ClubBasicInfo = Pick<Club, 'id' | 'name'>;

export type ClubDTO = Omit<
  Club,
  'id' | 'division' | 'voivodeship' | 'author'
> & {
  voivodeship: Voivodeship | 'Zagranica' | '';
  division: Division | '';
};

export type ClubsFilterData = {
  name: string;
  division: Division | '';
  voivodeship: string;
};
