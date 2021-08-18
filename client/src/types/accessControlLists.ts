import { User } from './auth';
import { Team } from './teams';

export type AccessControlList = {
  id: string;
  user?: User;
  team?: Team;
  players: string[];
  clubs: string[];
  reports: string[];
  reportBackgroundImages: string[];
};

export type TargetAssetType = 'user' | 'team';
export type AssetToAddType = 'player' | 'club' | 'report' | 'match' | 'note';

export type GrantAccessDTO = {
  targetAssetType: TargetAssetType;
  targetAssetId: string;
  assetToAddType: AssetToAddType;
  assetToAddId: string;
};
