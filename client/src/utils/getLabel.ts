const labels = [
  {
    value: 'GK',
    label: 'bramkarz',
  },
  {
    value: 'LB',
    label: 'lewy obrońca',
  },
  {
    value: 'RB',
    label: 'prawy obrońca',
  },
  {
    value: 'CB',
    label: 'środkowy obrońca',
  },
  {
    value: 'LW',
    label: 'lewy skrzydłowy',
  },
  {
    value: 'LWB',
    label: 'lewy wahadłowy',
  },
  {
    value: 'RW',
    label: 'prawy skrzydłowy',
  },
  {
    value: 'RWB',
    label: 'prawy wahadłowy',
  },
  {
    value: 'DM',
    label: 'defensywny pomocnik',
  },
  {
    value: 'CM',
    label: 'środkowy pomocnik',
  },
  {
    value: 'CAM',
    label: 'ofensywny pomocnik',
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
  { value: 'CBL', label: 'półlewy w trójce śo' },
  { value: 'CBR', label: 'półprawy w trójce śo' },
  { value: 'CBM', label: 'środkowy w trójce śo' },
  { value: 'DM/CM', label: 'defensywny/środkowy pomocnik' },
  { value: 'CM/CAM', label: 'środkowy/ofensywny pomocnik' },
  { value: 'LM', label: 'lewy pomocnik' },
  { value: 'RM', label: 'prawy pomocnik' },
  { value: 'RM/LM', label: 'prawy/lewy pomocnik' },
  { value: 'RW/LW', label: 'prawy/lewy skrzydłowy' },
  { value: 'CAM/F', label: 'ofensywny pomocnik/napastnik' },
  { value: 'F/W', label: 'napastnik/skrzydłowy' },
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
    value: 'negative',
    label: 'Selekcja negatywna',
  },
  {
    value: 'unknown',
    label: 'Brak decyzji',
  },
  {
    value: 'observe',
    label: 'Do obserwacji',
  },
  {
    value: 'positive',
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
  {
    value: 'individual',
    label: 'Cechy indywidualne',
  },
  {
    value: 'teamplay',
    label: 'Współdziałanie z partnerami',
  },
  {
    value: 'offense',
    label: 'Cechy ofensywne',
  },
  {
    value: 'defense',
    label: 'Cechy defensywne',
  },
  {
    value: 'physical',
    label: 'Cechy motoryczne',
  },
  {
    value: 'mental',
    label: 'Cechy mentalne',
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
