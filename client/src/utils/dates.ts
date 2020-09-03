const today = new Date();
const tomorrow = new Date(today);
const yearFromNow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
yearFromNow.setDate(yearFromNow.getDate() - 365);

export { today, tomorrow, yearFromNow };
