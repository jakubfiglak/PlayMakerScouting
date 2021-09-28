import { User } from './auth';
import { Team } from './teams';

export type AccessControlList = {
  id: string;
  user?: User;
  team?: Team;
  players: string[];
  clubs: string[];
  reports: string[];
  matches: string[];
  notes: string[];
  reportBackgroundImages: string[];
};

export type TargetAssetType = 'user' | 'team';

export type GrantAccessDTO = {
  targetAssetType: TargetAssetType;
  targetAssetId: string;
  clubs: string[];
  players: string[];
  matches: string[];
  notes: string[];
  reports: string[];
};
