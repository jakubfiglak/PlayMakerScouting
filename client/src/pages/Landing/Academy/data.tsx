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
import { Advantage, Value } from '../types';

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
  },
  {
    number: '04',
    title: 'Feedback',
    icon: <FeedbackIcon />,
    values: [
      'Konsultacje skuteczności naborów',
      'Monitorowanie kariery zawodników, którzy pojawili się na testach',
    ],
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

export type Effect = {
  logo: string;
  name: string;
  text: string;
};

export const effects = [
  {
    logo: bytomLogo,
    name: 'Polonia Bytom',
    text: 'Pomoc w naborach do Akdemii w sezonie 2020/21',
  },
  {
    logo: resoviaLogo,
    name: 'Resovia Rzeszów',
    text: 'Wsparcie w budowaniu akademii dla dziewczynek',
  },
  {
    logo: jantarLogo,
    name: 'Jantar Ustka',
    text: 'Pomoc w naborach do Akademii w sezonie 2019/2020',
  },
  {
    logo: chemikLogo,
    name: 'Chemik Bydgoszcz',
    text: 'Wskazanie najlepszych bramkarzy w danym regionie',
  },
];
