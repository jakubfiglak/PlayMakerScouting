import { User, UserRole } from './auth';
import { Voivodeship } from './common';

export type UserBasicInfo = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'team'
>;

export type UserFilterData = {
  lastName: string;
  voivodeship: Voivodeship | '';
  city: string;
  role: UserRole | '';
};

export type GoToTheMatchDTO = {
  match: string;
};
