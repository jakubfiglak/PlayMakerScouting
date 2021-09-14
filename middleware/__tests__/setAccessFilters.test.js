const setAccessFilters = require('../setAccessFilters');
const { buildReq, buildRes, buildNext } = require('../../test/utils');
const pluralizeAssetType = require('../../utils/pluralizeAssetType');

describe('setAccessFilters middleware', () => {
  it('should set accessFilters to an empty object if user is an admin', () => {
    const req = buildReq({ user: { role: 'admin' } });
    const res = buildRes();
    const next = buildNext();

    setAccessFilters('SOME-ASSET-TYPE')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
    expect(req.accessFilters).toStrictEqual({});
  });

  it('should properly set accessFilters if user is with the role "scout"', () => {
    const assetType = 'SOME-ASSET-TYPE';
    const aclIds = ['ID1', 'ID2', 'ID3'];

    const req = buildReq({
      user: { role: 'scout' },
      acl: { [pluralizeAssetType(assetType)]: aclIds },
    });
    const res = buildRes();
    const next = buildNext();

    setAccessFilters(assetType)(req, res, next);

    const expectedAccessFilters = { $or: [{ _id: { $in: aclIds } }, { isPublic: true }] };

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
    expect(req.accessFilters).toStrictEqual(expectedAccessFilters);
  });

  it('should properly set accessFilters if user is with the role "playmaker-scout"', () => {
    const assetType = 'SOME-ASSET-TYPE';
    const aclIds = ['ID1', 'ID2', 'ID3'];

    const req = buildReq({
      user: { role: 'playmaker-scout' },
      acl: { [pluralizeAssetType(assetType)]: aclIds },
    });
    const res = buildRes();
    const next = buildNext();

    setAccessFilters(assetType)(req, res, next);

    const expectedAccessFilters = {
      $or: [
        { _id: { $in: aclIds } },
        { isPublic: true },
        { isSeededFromPlaymakerDb: true },
        { createdByUserWithRole: { $in: ['admin', 'playmaker-scout'] } },
      ],
    };

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
    expect(req.accessFilters).toStrictEqual(expectedAccessFilters);
  });
});
