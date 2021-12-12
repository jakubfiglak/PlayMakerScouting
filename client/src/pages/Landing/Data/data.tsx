import {
  Storage as DatabaseIcon,
  AccessTime as TimeIcon,
  Money as MoneyIcon,
  DoubleArrow as ScoutingIcon,
} from '@material-ui/icons';
import phoneMockup from '../../../assets/phone1.png';
import phoneMenuMockup from '../../../assets/phone2.png';
import backgroundImage from '../../../assets/scouting-background.png';
import neptunLogo from '../../../assets/neptun-logo.png';
import resoviaLogo from '../../../assets/resovia-logo.png';
import skierniewiceLogo from '../../../assets/skierniewice-logo.png';
import odraLogo from '../../../assets/odra-logo.png';
import { Advantage, Effect } from '../types';

export const heroData = {
  backgroundImage,
  image: {
    src: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      Scout<em>Maker</em>.pro Analiza Danych
    </p>
  ),
  features: [
    'Bądź krok przed rywalami dzięki wiedzy analitycznej',
    'Usprawnij pracę działu skautingu',
    'Wykorzystaj modelowanie statystyczne do zadań specjalnych',
  ],
};

export const copyData = {
  title: (
    <p>
      Analiza Danych Scout<em>Maker</em>.Pro
    </p>
  ),
  text:
    'Usługa skautingowa skierowana do klubów wszystkich szczebli rozgrywkowych w Polsce. Raporty statystyczne dostarczane przez naszych analityków sportowych sugerują najlepszych piłkarzy wybranych lig wraz z przebiegiem ich kariery oraz informacjami o współpracy z trenerami. Baza danych pozwala sprawnie filtrować zawodników z regionu. Jest narzędziem, które sprawdza się w okienkach transferowych i prześwietla przeciwników przed każdym meczem.',
  image: {
    src: phoneMenuMockup,
    alt: 'App with menu open view',
  },
};

export const advantages: Advantage[] = [
  {
    title: 'Czas',
    icon: <TimeIcon color="inherit" />,
    text:
      'Piłkarz potrzebny na wczoraj? W zależności od skomplikowania, raport analizy statystycznej możesz otrzymać jeszcze tego samego tygodnia. ',
  },
  {
    title: 'Pieniądze',
    icon: <MoneyIcon color="inherit" />,
    text:
      'Zlecenie na każdą kieszeń. Wspólnie zdecydujemy, jaki zakres analizy da efekty oraz nie naruszy klubowego budżetu.',
  },
  {
    title: 'Baza danych',
    icon: <DatabaseIcon color="inherit" />,
    text:
      'Analiza tworzy przewagę. Kompleksowa i usystematyzowana wiedza minimalizuje ryzyko nietrafionych decyzji i pozwala być krok przed przeciwnikami.',
  },
  {
    title: 'Transfery',
    icon: <ScoutingIcon color="inherit" />,
    text:
      'Wzmacniaj, nie uzupełniaj. Sprawdzaj najlepszych zawodników i zwiększaj konkurencję w zespole. Stawiaj na piłkarską jakość, która spełnia oczekiwania.',
  },
];

export const effects: Effect[] = [
  {
    logo: neptunLogo,
    name: 'Neptun Końskie',
    text:
      'Przygotowanie pełnej wiedzy na temat piłkarzy z regionu przed oknem transferowym.',
    link:
      'https://docs.google.com/spreadsheets/d/1j3F5USvi03odeJqZFQ-M8FCzxLfE42P5/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: resoviaLogo,
    name: 'Resovia Rzeszów',
    text:
      'Znalezienie wszystkich dziewczynek grających z chłopcami w związku z nowo otwartą akademią.',
    link:
      'https://docs.google.com/spreadsheets/d/1eUvPMT_4a6CHo661ZyoS3VJYRWRJr2fu/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: skierniewiceLogo,
    name: 'Widok Skierniewice',
    text:
      'Znalezienie wszystkich bramkarzy z regionu o określonych parametrach.',
    link:
      'https://docs.google.com/spreadsheets/d/108PchGw8K2GSnQvpT2uzrQgLxFTDsplE/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    logo: odraLogo,
    name: 'Odra Opole',
    text:
      'Wstępna selekcja z ponad 60 do 25 zawodników, którzy zgłosili się na testy do rezerw.',
    link:
      'https://docs.google.com/spreadsheets/d/1U4dWPdJcyUrSLhPs1KEG2yr9rNxarHHD/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
];

export const methodology = [
  {
    number: '01',
    text: 'Określ potrzeby',
  },
  {
    number: '02',
    text: 'Sprawdzamy możliwość realizacji w ciągu 24h',
  },
  {
    number: '03',
    text: 'Przedstawiamy wycenę',
  },
  {
    number: '04',
    text: 'Po akceptacji gromadzimy dane i wykonujemy analizę',
  },
  {
    number: '05',
    text: 'Analizę otrzymujesz w ciągu 3-7 dni',
  },
];

export const oneTimeServicePricing = {
  price: '399 pln',
  features: [
    { title: 'Usługa jednorazowa', value: true },
    { title: 'Tworzenie statystycznych baz danych', value: true },
    { title: 'Statystyczna rekomendacja zawodników', value: true },
    { title: 'Wybór rozgrywek juniorskich/seniorskich/kobiecych', value: true },
    { title: 'Możliwość analizy wszystkich regionów', value: true },
    { title: 'Możliwość analizy wszystkich rozgrywek', value: true },
  ],
};

export const constantCooperationPricing = {
  price: '199 pln/miesiąc',
  features: [
    { title: 'Stała współpraca', value: true },
    { title: 'Tworzenie statystycznych baz danych', value: true },
    { title: 'Statystyczna rekomendacja zawodników', value: true },
    { title: 'Wybór rozgrywek juniorskich/seniorskich/kobiecych', value: true },
    { title: 'Możliwość analizy wszystkich regionów', value: true },
    { title: 'Możliwość analizy wszystkich rozgrywek', value: true },
  ],
};
