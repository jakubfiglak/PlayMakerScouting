import {
  Storage as DatabaseIcon,
  Search as ScoutingIcon,
  Assessment as ReportsIcon,
  Check as FeedbackIcon,
  AccessTime as TimeIcon,
  Money as MoneyIcon,
} from '@material-ui/icons';
import phoneMockup from '../../../assets/phone1.png';
import phoneMenuMockup from '../../../assets/phone2.png';
import backgroundImage from '../../../assets/academy-background.png';
import bytomLogo from '../../../assets/bytom-logo.png';
import resoviaLogo from '../../../assets/resovia-logo.png';
import jantarLogo from '../../../assets/jantar-logo.png';
import chemikLogo from '../../../assets/chemik-logo.png';
import { Advantage, Effect, Value } from '../types';

export const heroData = {
  backgroundImage,
  image: {
    src: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      Scout<em>Maker</em>.pro Akademia
    </p>
  ),
  features: [
    'Zapraszaj talenty do swojej akademii',
    'Miej dostęp do statystyk, notatek, raportów i profili piłkarzy',
    'Uzyskaj wsparcie w przeprowadzaniu naborów',
  ],
};

export const copyData = {
  title: (
    <p>
      Analiza Danych Scout<em>Maker</em>.Pro
    </p>
  ),
  text:
    'Usługa skautingowa pozwalająca na monitorowanie wszystkich młodzieżowych lig piłkarskich w Polsce. Raporty statystyczne dostarczane przez naszych analityków sportowych sugerują największe talenty wybranych rozgrywek wraz z przebiegiem ich kariery oraz informacjami o współpracy z trenerami. Baza danych pozwala sprawnie filtrować zawodników z regionu. Jest narzędziem, które sprawdza się w okienkach transferowych i wskazuje najlepszych zawodników drużyny przeciwnej przed każdym meczem.',
  image: {
    src: phoneMenuMockup,
    alt: 'App with menu open view',
  },
};

export const values: Value[] = [
  {
    number: '01',
    title: 'Analiza danych',
    icon: <DatabaseIcon />,
    values: [
      'Określ zapotrzebowanie kadrowe',
      'Dostarczamy kompletne dane statystyczne zawodników',
      'Szybko i sprawnie filtruj bazę według rocznika, ligi i regionu ',
    ],
    link: '',
  },
  {
    number: '02',
    title: 'Skauting',
    icon: <ScoutingIcon />,
    values: [
      'Koordynujemy działania skautingowe akademii',
      'Dostarczamy listę obserwacji najlepszych zawodników rywali',
      'Twórz notatki w aplikacji i udostępniaj je swoim współpracownikom',
    ],
    link: '',
  },
  {
    number: '03',
    title: 'Nabory',
    icon: <ReportsIcon />,
    values: [
      'Promujemy ogłoszenia o naborach w social mediach',
      'Pomagamy we wstępnej weryfikacji zgłoszeń',
      'Wspieramy kontakt  z klubem lub bezpośrednio z zawodnikiem',
    ],
    link: '',
  },
  {
    number: '04',
    title: 'Feedback',
    icon: <FeedbackIcon />,
    values: [
      'Konsultacje skuteczności naborów',
      'Monitorowanie kariery zawodników, którzy pojawili się na testach',
    ],
    link: '',
  },
];

export const advantages: Advantage[] = [
  {
    title: 'czas',
    icon: <TimeIcon color="inherit" />,
    text:
      'Rób swoje. Organizacja naborów, zapraszanie zawodników i weryfikacja ich umiejętności to złożony proces.',
  },
  {
    title: 'pieniądze',
    icon: <MoneyIcon color="inherit" />,
    text:
      'Zlecenie na każdą kieszeń. Wspólnie zdecydujemy, jaki zakres danych da efekty oraz nie naruszy klubowego budżetu. Skorzystaj z jednorazowej analizy lub długofalowej współpracy.',
  },
  {
    title: 'baza danych',
    icon: <DatabaseIcon color="inherit" />,
    text:
      'Informacja to pieniądz. Zaufaj wiedzy analitycznej i porównuj setki młodych piłkarzy w krótkim czasie. Sprawdź, z jakimi trenerami współpracowali i gdzie zaczerpnąć opinii.',
  },
  {
    title: 'e-skauting',
    icon: <ScoutingIcon color="inherit" />,
    text:
      'Przyszłość w kieszeni. Monitoruj wszystkich zawodników z wybranego regionu i zapraszaj do siebie najlepszych. Bądź krok przed przeciwnikami.',
  },
];

export const effects: Effect[] = [
  {
    logo: bytomLogo,
    name: 'Polonia Bytom',
    text: 'Pomoc w naborach do Akdemii w sezonie 2020/21',
    link: '',
  },
  {
    logo: resoviaLogo,
    name: 'Resovia Rzeszów',
    text: 'Wsparcie w budowaniu akademii dla dziewczynek',
    link:
      'https://docs.google.com/spreadsheets/d/1eUvPMT_4a6CHo661ZyoS3VJYRWRJr2fu/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: jantarLogo,
    name: 'Jantar Ustka',
    text: 'Pomoc w naborach do Akademii w sezonie 2019/2020',
    link:
      'https://docs.google.com/spreadsheets/d/1LxromvMx1iISMBRqv_eQrcgpEfGBAxBR/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: chemikLogo,
    name: 'Chemik Bydgoszcz',
    text: 'Wskazanie najlepszych bramkarzy w danym regionie',
    link: '',
  },
];

export const oneTimeServicePricing = {
  price: '399 pln',
  features: [
    { title: 'Usługa jednorazowa', value: true },
    { title: 'Tworzenie statystycznych baz danych', value: true },
    { title: 'Statystyczna rekomendacja zawodników', value: true },
    { title: 'Zlecenia obserwacji', value: false },
    { title: 'Wsparcie dla aktualnego działu skautingu', value: false },
    { title: 'Statystyczna analiza przeciwników', value: false },
    { title: 'Informacja o współpracy trenerów z piłkarzami', value: true },
    { title: 'Wszystkie ligi młodzieżowe PL', value: true },
  ],
};

export const constantCooperationPricing = {
  price: '199 pln/miesiąc',
  features: [
    { title: 'Stała współpraca', value: true },
    { title: 'Tworzenie statystycznych baz danych', value: true },
    { title: 'Statystyczna rekomendacja zawodników', value: true },
    { title: 'Zlecenia obserwacji', value: true },
    { title: 'Wsparcie dla aktualnego działu skautingu', value: true },
    { title: 'Statystyczna analiza przeciwników', value: true },
    { title: 'Informacja o współpracy trenerów z piłkarzami', value: true },
    { title: 'Wszystkie ligi młodzieżowe PL', value: true },
  ],
};
