import { Division } from './clubs';
import { positions } from '../utils/constants';
import { Country } from './common';

export type Position = typeof positions[number];

export type Foot = 'L' | 'R' | 'both';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  country: Country;
  position: Position;
  yearOfBirth: number;
  height?: number;
  weight?: number;
  footed: Foot;
  club: {
    id: string;
    name: string;
    division: Division;
  };
  lnpID?: string;
  lnpProfileURL?: string;
  minut90ProfileURL?: string;
  transfermarktProfileURL?: string;
  author: string;
  reportsCount: number;
  notesCount: number;
};

export type PlayerBasicInfo = Pick<
  Player,
  'id' | 'firstName' | 'lastName' | 'position' | 'club'
>;

export type PlayerDTO = Omit<
  Player,
  'id' | 'club' | 'author' | 'reportsCount' | 'notesCount'
> & {
  club: string;
};

export type PlayersFilterData = {
  lastName: string;
  club: string;
  position: string;
  bornAfter: string;
  bornBefore: string;
};
