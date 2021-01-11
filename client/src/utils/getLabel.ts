const labels = [
  {
    value: 'GK',
    label: 'bramkarz',
  },
  {
    value: 'CB',
    label: 'środkowy obrońca',
  },
  {
    value: 'FB',
    label: 'boczny obrońca',
  },
  {
    value: 'CM',
    label: 'środkowy pomocnik',
  },
  {
    value: 'WM',
    label: 'boczny pomocnik',
  },
  {
    value: 'F',
    label: 'napastnik',
  },
  {
    value: 'both',
    label: 'Obie',
  },
  {
    value: 'L',
    label: 'Lewa',
  },
  {
    value: 'R',
    label: 'Prawa',
  },
  {
    value: 'league',
    label: 'liga',
  },
  {
    value: 'cup',
    label: 'puchar',
  },
  {
    value: 'friendly',
    label: 'towarzyski',
  },
  {
    value: 'open',
    label: 'otwarte',
  },
  {
    value: 'accepted',
    label: 'przyjęte do realizacji',
  },
  {
    value: 'closed',
    label: 'zamknięte',
  },
  {
    value: 'Invalid credentials',
    label: 'Nieprawidłowe dane logowania',
  },
  {
    value: 'User already exists',
    label: 'Na podany adres e-mail zarejestrowano już użytkownika',
  },
  {
    value: 'Successfully created new user!',
    label: 'Proces rejestracji zakończony pomyślnie, witamy!',
  },
  {
    value: 'Login success!',
    label: 'Proces logowania zakończony pomyślnie, witamy!',
  },
  {
    value: 'Account details successfully updated!',
    label: 'Twoje konto użytkownika zostało zaktualizowane pomyślnie',
  },
  {
    value: 'Password updated successfully!',
    label: 'Hasło zostało zmienione pomyślnie',
  },
  {
    value: 1,
    label: 'Selekcja negatywna',
  },
  {
    value: 2,
    label: 'Brak decyzji',
  },
  {
    value: 3,
    label: 'Do obserwacji',
  },
  {
    value: 4,
    label: 'Selekcja pozytywna',
  },
  {
    value: 'home',
    label: 'dom',
  },
  {
    value: 'away',
    label: 'wyjazd',
  },
  {
    value: 'ballReception',
    label: 'Przyjęcie piłki',
  },
  {
    value: 'passing',
    label: 'Podania',
  },
  {
    value: 'defOneOnOne',
    label: 'Gra 1v1 w obronie',
  },
  {
    value: 'airPlay',
    label: 'Gra w powietrzu',
  },
  {
    value: 'positioning',
    label: 'Ustawianie się',
  },
  {
    value: 'attOneOnOne',
    label: 'Gra 1v1 w ataku',
  },
  {
    value: 'finishing',
    label: 'Finalizacja akcji',
  },
  {
    value: 'attack',
    label: 'Udział w ataku',
  },
  {
    value: 'defense',
    label: 'Praca w obronie',
  },
  {
    value: 'transition',
    label: 'Fazy przejściowe',
  },
  {
    value: 'leading',
    label: 'Cechy wiodące',
  },
  {
    value: 'neglected',
    label: 'Cechy zaniedbane',
  },
];

export const getLabel = (value: string | number | null) => {
  const element = labels.find((el) => el.value === value);
  if (element) {
    return element.label;
  }
  if (value) {
    return value.toString();
  }

  return null;
};
