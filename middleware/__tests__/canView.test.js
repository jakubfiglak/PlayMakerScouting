const httpStatus = require('http-status');
const canView = require('../canView');
const { buildReq, buildRes, buildNext } = require('../../test/utils');
const pluralizeAssetType = require('../../utils/pluralizeAssetType');

const assetType = 'SOME-ASSET-TYPE';
const pluralizedAssetType = pluralizeAssetType(assetType);

describe('if user is with the role "admin"', () => {
  it('should call next', () => {
    const req = buildReq({ user: { role: 'admin' } });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});

describe('if user is with the role "scout"', () => {
  it('should call next if the asset is public', () => {
    const req = buildReq({
      user: { role: 'scout' },
      [assetType]: { isPublic: true },
      acl: { [pluralizedAssetType]: [] },
    });
    const res = buildRes();
    const next = buildNext();
    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next if the asset is users acl', () => {
    const assetId = 'ID';

    const req = buildReq({
      user: { role: 'scout' },
      [assetType]: {},
      acl: { [pluralizedAssetType]: [assetId] },
      params: { id: assetId },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("should throw 403 error if user doesn't have access to the requested asset", () => {
    const req = buildReq({
      user: { role: 'scout' },
      [assetType]: {},
      acl: { [pluralizedAssetType]: [] },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(httpStatus.FORBIDDEN);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"You don\'t have access to the SOME-ASSET-TYPE you\'ve requsted"'
    );
  });
});

describe('if user is with the role "playmaker-scout"', () => {
  it('should call next if the asset is public', () => {
    const req = buildReq({
      user: { role: 'playmaker-scout' },
      [assetType]: { isPublic: true },
      acl: { [pluralizedAssetType]: [] },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next if the asset is users acl', () => {
    const assetId = 'ID';

    const req = buildReq({
      user: { role: 'playmaker-scout' },
      [assetType]: {},
      acl: { [pluralizedAssetType]: [assetId] },
      params: { id: assetId },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next if the asset has the flag "isSeededFromPlaymakerDb" set to true', () => {
    const assetId = 'ID';

    const req = buildReq({
      user: { role: 'playmaker-scout' },
      [assetType]: { isSeededFromPlaymakerDb: true },
      acl: { [pluralizedAssetType]: [assetId] },
      params: { id: assetId },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next if the asset is created by user with the role of "admin"', () => {
    const assetId = 'ID';

    const req = buildReq({
      user: { role: 'playmaker-scout' },
      [assetType]: { createdByUserWithRole: 'admin' },
      acl: { [pluralizedAssetType]: [assetId] },
      params: { id: assetId },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next if the asset is created by user with the role of "playmaker-scout"', () => {
    const assetId = 'ID';

    const req = buildReq({
      user: { role: 'playmaker-scout' },
      [assetType]: { createdByUserWithRole: 'playmaker-scout' },
      acl: { [pluralizedAssetType]: [assetId] },
      params: { id: assetId },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("should throw 403 error if user doesn't have access to the requested asset", () => {
    const req = buildReq({
      user: { role: 'playmaker-scout' },
      [assetType]: {},
      acl: { [pluralizedAssetType]: [] },
    });
    const res = buildRes();
    const next = buildNext();

    canView(assetType)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(httpStatus.FORBIDDEN);
    expect(next.mock.calls[0][0].message).toMatchInlineSnapshot(
      '"You don\'t have access to the SOME-ASSET-TYPE you\'ve requsted"'
    );
  });
});
