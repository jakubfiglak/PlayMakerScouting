import { Club } from './clubs';
import { Player, Position } from './players';
import { User } from './auth';
import { Match } from './matches';
import { RatingDescription } from './common';

export type Note = {
  id: string;
  player?: Player;
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
  | 'id'
  | 'player'
  | 'playerCurrentClub'
  | 'text'
  | 'rating'
  | 'docNumber'
  | 'shirtNo'
>;

export type NoteDTO = Pick<
  Note,
  'positionPlayed' | 'shirtNo' | 'text' | 'maxRatingScore' | 'rating'
> & {
  player?: string | null;
  match?: string | null;
};

export type NotesFilterData = {
  player: string;
  position: Position | '';
  club: string;
  match: string;
  rating: RatingDescription | 'all';
};
