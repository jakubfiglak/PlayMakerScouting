import type { User } from './auth';

export type Team = {
  id: string;
  name: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
};

export type TeamDTO = Pick<Team, 'name'> & { members: string[] };
