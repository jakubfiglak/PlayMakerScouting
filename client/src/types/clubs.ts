import { Voivodeship } from './common';

export type Division =
  | 'Ekstraklasa'
  | 'I liga'
  | 'II liga'
  | 'III liga'
  | 'IV liga'
  | 'Klasa okręgowa'
  | 'Klasa A'
  | 'Klasa B'
  | 'Klasa C';

export type Club = {
  id: string;
  name: string;
  division: Division;
  voivodeship: Voivodeship | 'Zagranica';
  lnpID?: string;
};

export type ClubBasicInfo = Pick<Club, 'id' | 'name'>;

export type ClubDTO = Omit<Club, 'id' | 'division' | 'voivodeship'> & {
  voivodeship: Voivodeship | 'Zagranica' | '';
  division: Division | '';
};

export type ClubsFilterData = {
  name: string;
  division: Division | '';
  voivodeship: string;
};
