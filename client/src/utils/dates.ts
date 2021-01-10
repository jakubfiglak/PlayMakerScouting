const today = new Date();
const tomorrow = new Date(today);
const yearFromNow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
yearFromNow.setDate(yearFromNow.getDate() - 365);

const formatDate = (date: string, hour?: boolean) => {
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

const formatDateObject = (date: Date) => date.toISOString().split('T')[0];

export { today, tomorrow, yearFromNow, formatDate, formatDateObject };
