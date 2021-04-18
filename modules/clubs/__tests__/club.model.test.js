const Club = require('../club.model');
const { buildClub } = require('../../../test/utils');

it('should correctly validate a valid club', async () => {
  const newClub = buildClub();
  await expect(new Club(newClub).validate()).resolves.toBeUndefined();
});

it('should throw a validation error if voivodeship name is not valid', async () => {
  const newClub = buildClub({ voivodeship: 'UNKNOWN_VOIVODESHIP' });
  await expect(new Club(newClub).validate()).rejects.toThrow();
});

it('should throw a validation error if division name is not valid', async () => {
  const newClub = buildClub({ division: 'UNKNOWN_DIVISION' });
  await expect(new Club(newClub).validate()).rejects.toThrow();
});
