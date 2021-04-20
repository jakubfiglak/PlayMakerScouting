const Rating = require('../rating.model');
const { buildRating } = require('../../../test/utils');

it('should correctly validate a valid rating', async () => {
  const rating = buildRating();
  await expect(new Rating(rating).validate()).resolves.toBeUndefined();
});

it('should throw a validation error if author field is not a valid mongoose ObjectID', async () => {
  const rating = buildRating({ author: 'NOT-VALID-OBJECTID' });
  await expect(new Rating(rating).validate()).rejects.toMatchInlineSnapshot(
    '[ValidationError: Rating validation failed: author: Cast to ObjectId failed for value "NOT-VALID-OBJECTID" at path "author"]'
  );
});

it('should throw a validation error if category is not valid', async () => {
  const rating = buildRating({ category: 'SOME-CATEGORY' });
  await expect(new Rating(rating).validate()).rejects.toMatchInlineSnapshot(
    '[ValidationError: Rating validation failed: category: `SOME-CATEGORY` is not a valid enum value for path `category`.]'
  );
});
