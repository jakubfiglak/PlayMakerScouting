import {
  Storage as DatabaseIcon,
  Check as RecommendationsIcon,
  Assessment as ReportsIcon,
  Note as NotesIcon,
  AccessTime as TimeIcon,
  Money as MoneyIcon,
  DoubleArrow as ScoutingIcon,
  Accessibility as IntuitiveIcon,
  PhoneIphone as MobileIcon,
} from '@material-ui/icons';
import phoneMockup from '../../../assets/phone1.png';
import phoneMenuMockup from '../../../assets/phone2.png';
import backgroundImage from '../../../assets/scouting-background.png';
import { Advantage } from '../types';

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
  image: {
    src: phoneMenuMockup,
    alt: 'App with menu open view',
  },
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

export const advantages: Advantage[] = [
  {
    title: 'czas',
    icon: <TimeIcon color="inherit" />,
    text:
      'Dostosowywanie, udostępnianie i prezentacja danych w jednym narzędziu..',
  },
  {
    title: 'baza danych',
    icon: <DatabaseIcon color="inherit" />,
    text:
      'Kompleksowa i usystematyzowana wiedza pomaga w zarządzaniu Twoją pracą.',
  },
  {
    title: 'intuicyjność',
    icon: <IntuitiveIcon color="inherit" />,
    text: 'Prosta obsługa, która ułatwia pracę w każdych warunkach.',
  },
  {
    title: 'Wyświetlanie',
    icon: <MobileIcon color="inherit" />,
    text: 'Interfejs dopasowany do komputera i urządzeń mobilnych.',
  },
];

export type Testimonial = {
  name: string;
  role: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Łukasz Cebula',
    role: 'Analityk Odry Opole',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium itaque commodi non cumque laboriosam delectus tempora id quod pariatur neque.',
  },
  {
    name: 'Waldemar Jedynak',
    role: 'Prezes Górnika Polkowice',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium itaque commodi non cumque laboriosam delectus tempora id quod pariatur neque.',
  },
  {
    name: 'Rafał Stryczek',
    role: 'Skaut',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium itaque commodi non cumque laboriosam delectus tempora id quod pariatur neque.',
  },
];
