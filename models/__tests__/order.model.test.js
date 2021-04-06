const Order = require('../order.model');
const { buildOrder } = require('../../test/utils');

it('should correctly validate a valid order', async () => {
  const order = buildOrder();
  await expect(new Order(order).validate()).resolves.toBeUndefined();
});

it('should throw a validation error if playerId is not a valid ObjectID', async () => {
  const order = buildOrder({ player: 123456 });
  await expect(new Order(order).validate()).rejects.toThrowErrorMatchingInlineSnapshot(
    '"Order validation failed: player: Cast to ObjectId failed for value \\"123456\\" at path \\"player\\""'
  );
});

it('should throw a validation error if status is not a valid status', async () => {
  const order = buildOrder({ status: 'UNKNOWN_STATUS' });
  await expect(new Order(order).validate()).rejects.toThrowErrorMatchingInlineSnapshot(
    '"Order validation failed: status: `UNKNOWN_STATUS` is not a valid enum value for path `status`."'
  );
});
