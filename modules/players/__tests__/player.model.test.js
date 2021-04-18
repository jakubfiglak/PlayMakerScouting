const Player = require('../player.model');
const { buildPlayer } = require('../../../test/utils');

it('should correctly validate a valid player', async () => {
  const player = buildPlayer();
  await expect(new Player(player).validate()).resolves.toBeUndefined();
});

it('should throw a validation error if club field is not a valid mongoose ObjectId', async () => {
  const player = buildPlayer({ club: 'NOT-VALID-OBJECTID' });
  await expect(new Player(player).validate()).rejects.toMatchInlineSnapshot(
    '[ValidationError: Player validation failed: club: Cast to ObjectId failed for value "NOT-VALID-OBJECTID" at path "club"]'
  );
});

it('should throw a validation error if position is not valid', async () => {
  const player = buildPlayer({ position: 'NOT-VALID-POSITION' });
  await expect(new Player(player).validate()).rejects.toMatchInlineSnapshot(
    '[ValidationError: Player validation failed: position: `NOT-VALID-POSITION` is not a valid enum value for path `position`.]'
  );
});

it('should throw a validation error if footed field is not valid', async () => {
  const player = buildPlayer({ footed: 'NOT-VALID-FOOT' });
  await expect(new Player(player).validate()).rejects.toMatchInlineSnapshot(
    '[ValidationError: Player validation failed: footed: `NOT-VALID-FOOT` is not a valid enum value for path `footed`.]'
  );
});
