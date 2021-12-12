import {
  Storage as DatabaseIcon,
  AccessTime as TimeIcon,
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
    title: 'Czas',
    icon: <TimeIcon color="inherit" />,
    text:
      'Dostosowywanie, udostępnianie i prezentacja danych w jednym narzędziu..',
  },
  {
    title: 'Baza danych',
    icon: <DatabaseIcon color="inherit" />,
    text:
      'Kompleksowa i usystematyzowana wiedza pomaga w zarządzaniu Twoją pracą.',
  },
  {
    title: 'Intuicyjność',
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
      'Odra Opole była jednym z pierwszych klubów, które zawarły umowę na usługi scoutingowe z platformą Playermaker Pro. Cenimy sobie profesjonalizm, zaangażowanie i ciągłą chęć rozwoju u ludzi związanych z tym projektem. Na współpracy korzysta zarówno pierwszy zespół, jak i Akademia Odry Opole. Zakres działań jest poszerzany z każdą kolejna rundą, co z pewnością przekłada się na rozwój działu scoutingu w klubie. Z czystym sumieniem polecamy współpracę z Playmaker Pro. Dzięki aplikacji możemy w dowolnej chwili sprawdzać status prac skautów i weryfikować podesłane nam nazwiska przez ludzi z otoczenia piłkarskiego. To duże ułatwienie i oszczędność czasu. Wszystko mamy w jednym miejscu.',
  },
  {
    name: 'Rafał Stryczek',
    role: 'Skaut "PlayMaker.Pro" oraz "Moja i Twoja Piłka"',
    text:
      'Aplikacja pozwoliła mi ustrukturyzować swoje działania skautingowe. Nie potrzebuję już notesu i przepisywania notatek po meczu. Raz zapisane informacje są łatwe do filtrowania, a cała moja wiedza dostępna pod dwoma kliknięciami.',
  },
  {
    name: 'Piotr Stawarczyk',
    role: 'Piłkarz Hutnika Kraków, Skaut',
    text:
      'Aplikacja skautingowa PlayMaker.pro pozwala mi w jednym miejscu trzymać całą moją pracę dotyczącą obserwacji zawodników. Mogę wprowadzać krótkie notki i tworzyć obszerne raporty. Jest prosta w obsłudze i dopasowana do moich kryteriów oceny potencjału piłkarzy.',
  },
];

export const variantOnePricing = {
  price: '29 pln/miesiąc',
  features: [
    { title: 'Moduł notatek', value: true },
    { title: 'Moduł raportów', value: true },
    { title: 'Wykresy umiejętności', value: true },
    { title: 'Raporty w pdf', value: true },
    { title: 'QR dla raportów', value: true },
    { title: 'Kreator szablonów raportów', value: false },
    { title: '1 licencja', value: true },
  ],
};

export const variantTwoPricing = {
  price: '49 pln/miesiąc',
  features: [
    { title: 'Moduł notatek', value: true },
    { title: 'Moduł raportów', value: true },
    { title: 'Wykresy umiejętności', value: true },
    { title: 'Raporty w pdf', value: true },
    { title: 'QR dla raportów', value: true },
    { title: 'Kreator szablonów raportów', value: true },
    { title: 'Nieograniczona liczba licencji', value: true },
  ],
};
