import phoneMockup from '../../../assets/phone-mockup-activity.png';
import backgroundImage from '../../../assets/scouting-background.png';

export const heroData = {
  backgroundImage,
  image: {
    src: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      Aplikacja Scout<em>Maker</em>.pro
    </p>
  ),
  features: [
    'Stwórz swój schemat obserwacji',
    'Schowaj do kieszeni notatki, raporty i profile piłkarzy',
    'Buduj własną bazę skautingową',
  ],
};

export const copyData = {
  title: (
    <p>
      Aplikacja Scout<em>Maker</em>.Pro
    </p>
  ),
  text:
    'Proste i intuicyjne w obsłudze narzędzie skautingowe skierowane do klubów, skautów i agencji menadżerskich. Współczesna alternatywa kartki i długopisu dostosowana do urządzeń mobilnych. Aplikacja ScoutMaker.pro systematyzuje działania skautingowe i znacznie przyspiesza przepływ informacji.',
};

export const functionalities = [
  {
    title: 'Notatki',
    text: 'Zapisuj krótkie notatki o wybranych piłkarzach w trakcie i po meczu',
  },
  {
    title: 'Jedź na mecz',
    text: 'Jednym kliknięciem przenieś zdarzenia meczowe do telefonu',
  },
  {
    title: 'Kreator szablonów',
    text: 'Dopasuj raporty o zawodnikach do swoich kryteriów obserwacyjnych',
  },
  {
    title: 'Raporty',
    text: 'Twórz indywidualne i szczegółowe obserwacje meczowe',
  },
  {
    title: 'Współdzielenie',
    text:
      'Przeglądaj raporty wewnątrz klubu lub twórz i udostępniaj swoim partnerom',
  },
  {
    title: 'Baza skautingowa',
    text: 'Filtruj bazę zawodników według własnych preferencji',
  },
];
