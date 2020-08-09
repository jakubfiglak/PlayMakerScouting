export const formatDateObject = (date: Date) =>
  date.toISOString().split('T')[0];
