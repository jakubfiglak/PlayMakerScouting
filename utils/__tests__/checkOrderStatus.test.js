const checkOrderStatus = require('../checkOrderStatus');

it('should throw a 400 error if status is not in allowedStatuses array', () => {
  expect(() =>
    checkOrderStatus({ status: 'open', allowedStatuses: ['closed'] })).toThrowErrorMatchingInlineSnapshot(
    '"You cannot perform this operation on an order with the status of open"'
  );
});

it('should do nothing if status is in allowedStatuses array', () => {
  expect(() =>
    checkOrderStatus({
      status: 'open',
      allowedStatuses: ['open'],
    })).not.toThrow();
});
