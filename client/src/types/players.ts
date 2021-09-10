import { Division } from './clubs';

export type Position =
  | 'GK'
  | 'LB'
  | 'RB'
  | 'CB'
  | 'CBL'
  | 'CBR'
  | 'CBM'
  | 'LW'
  | 'LWB'
  | 'RW'
  | 'RWB'
  | 'DM'
  | 'DM/CM'
  | 'CM'
  | 'CM/CAM'
  | 'CAM'
  | 'LM'
  | 'RM'
  | 'RM/LM'
  | 'RW/LW'
  | 'CAM/F'
  | 'F'
  | 'F/W';

export type Foot = 'L' | 'R' | 'both';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
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
