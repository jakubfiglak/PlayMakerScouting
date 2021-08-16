import { Club } from './clubs';
import { Player, Position } from './players';
import { User } from './auth';
import { Match } from './matches';

export type Note = {
  id: string;
  player?: Pick<Player, 'id' | 'firstName' | 'lastName'>;
  playerCurrentClub?: Pick<Club, 'id' | 'name' | 'division'>;
  author: Pick<User, 'id' | 'firstName' | 'lastName'>;
  match?: Match;
  positionPlayed?: Position;
  shirtNo?: number;
  text: string;
  maxRatingScore: number;
  rating: number;
  percentageRating: number;
  docNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteBasicInfo = Pick<
  Note,
  'id' | 'player' | 'playerCurrentClub' | 'text' | 'rating' | 'docNumber'
>;

export type NoteDTO = Pick<
  Note,
  'positionPlayed' | 'shirtNo' | 'text' | 'maxRatingScore' | 'rating'
> & {
  player?: string;
  match?: string;
};

export type NotesFilterData = {
  player: string;
  club: string;
  match: string;
};
