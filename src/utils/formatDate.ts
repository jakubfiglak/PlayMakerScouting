export const formatDate = (date: string, hour?: boolean) => {
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  const hourOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  if (hour) {
    options = { ...options, ...hourOptions };
  }

  return new Intl.DateTimeFormat('pl-PL', options).format(new Date(date));
};
