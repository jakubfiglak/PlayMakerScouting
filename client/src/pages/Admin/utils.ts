import {
  AccessControlList,
  TargetAssetType,
} from '../../types/accessControlLists';

type AssetToAddType = 'clubs' | 'players' | 'matches' | 'notes' | 'reports';

type Args = {
  targetAssetType: TargetAssetType;
  targetAssetId: string;
  assetType: AssetToAddType;
  acls: AccessControlList[];
};

export type GetDisabledOptionsFormAcl = ({
  targetAssetType,
  targetAssetId,
  assetType,
  acls,
}: Args) => string[];

export const getDisabledOptionsFromAcl: GetDisabledOptionsFormAcl = ({
  targetAssetType,
  targetAssetId,
  assetType,
  acls,
}) => {
  const activeAcl =
    targetAssetType === 'user'
      ? acls.find((acl) => acl.user?.id === targetAssetId)
      : acls.find((acl) => acl.team?.id === targetAssetId);

  if (activeAcl) {
    return activeAcl[assetType];
  }

  return [];
};
