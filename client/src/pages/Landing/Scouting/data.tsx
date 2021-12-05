import {
  Storage as DatabaseIcon,
  Check as RecommendationsIcon,
  Assessment as ReportsIcon,
  Note as NotesIcon,
  AccessTime as TimeIcon,
  Money as MoneyIcon,
  DoubleArrow as ScoutingIcon,
} from '@material-ui/icons';
import zakPhoto from '../../../assets/zak-photo.png';
import tkoczPhoto from '../../../assets/tkocz-photo.png';
import szmytPhoto from '../../../assets/szmyt-photo.jpg';
import sypekPhoto from '../../../assets/sypek-photo.jpg';
import bytomLogo from '../../../assets/bytom-logo.png';
import odraLogo from '../../../assets/odra-logo.png';
import podhaleLogo from '../../../assets/podhale-logo.png';
import nielbaLogo from '../../../assets/nielba-logo.png';
import polkowiceLogo from '../../../assets/polkowice-logo.png';
import lubinLogo from '../../../assets/lubin-logo.png';
import phoneMockup from '../../../assets/phone1.png';
import phoneMenuMockup from '../../../assets/phone2.png';
import backgroundImage from '../../../assets/scouting-background.png';
import { Advantage, Value } from '../types';

export const heroData = {
  backgroundImage,
  image: {
    src: phoneMockup,
    alt: 'App dashboard view',
  },
  title: (
    <p>
      Scout<em>Maker</em>.pro
    </p>
  ),
  features: [
    'Korzystaj z największej bazy skautingowej w Polsce',
    'Uzyskaj dostęp do statystyk, notatek, raportów i profili piłkarzy',
    'Zlecaj indywidualną obserwację zawodnika',
  ],
};

export const copyData = {
  title: (
    <p>
      Skauting Scout<em>Maker</em>.Pro
    </p>
  ),
  text: (
    <p>
      Usługa skautingowa pozwalająca na monitorowanie każdej ligi piłkarskiej w
      Polsce. Zespół wyszkolonych skautów obserwuje wskazane przez klub
      rozgrywki i dostarcza notatki oraz raporty meczowe według wybranych
      parametrów. Sprawozdania poszerzone są o zaawansowane bazy danych
      statystycznych naszych analityków sportowych. ScoutMaker.pro odpowiada
      bieżącemu zapotrzebowaniu kadrowemu oraz wpisuje się w długofalowy plan
      budowania zespołu. Wartość usługi jest niższa niż miesięczne wynagrodzenie
      jednego piłkarza. To <em>inwestycja</em>, nie koszt.
    </p>
  ),
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
      'Określ zapotrzebowanie kadrowe oraz rozgrywki do obserwacji',
      'Dostarczamy kompletne dane statystyczne zawodników wraz z profilami transfermarkt',
      'Szybko i sprawnie filtruj bazę według rocznika, pozycji, ligi, regionu ',
    ],
    link:
      'https://docs.google.com/spreadsheets/d/1zmP7uwEdXgTcHyAM0kLqZJzwHhRkXtpI/edit?usp=sharing&ouid=117557516330646294431&rtpof=true&sd=true',
  },
  {
    number: '02',
    title: 'Notatki',
    icon: <NotesIcon />,
    values: [
      'Tworzymy krótkie notatki o każdym zawodniku, który jest zgodny z kryteriami obserwacji',
      'Zawężamy listę do najlepszych na wskazanych pozycjach',
    ],
    link:
      'https://drive.google.com/file/d/1c7Clw9Q3_HTFJHml7QNTfroMTGi3imwu/view?usp=sharing',
  },
  {
    number: '03',
    title: 'Raporty',
    icon: <ReportsIcon />,
    values: [
      'Dopasujemy arkusz obserwacyjny do Twoich potrzeb',
      'Obserwujemy konkretne nazwiska na życzenie',
      'Tworzymy raporty o wyselekcjonowanych zawodnikach',
    ],
    link:
      'https://drive.google.com/file/d/1KzkA-VticPoDlzuqpCVRGC-q7wos8T68/view?usp=sharing',
  },
  {
    number: '04',
    title: 'Rekomendacje',
    icon: <RecommendationsIcon />,
    values: [
      'Utrzymujemy regularny kontakt i elastycznie dopasowujemy się do potrzeb kadrowych',
      'Dostarczamy okresowe raporty podsumowujące, nie tylko przed oknem transferowym',
    ],
    link:
      'https://drive.google.com/file/d/1MbPfmxE8g0CTpieYb1Z0d99YwhNAkeCq/view?usp=sharing',
  },
];

export const advantages: Advantage[] = [
  {
    title: 'czas',
    icon: <TimeIcon color="inherit" />,
    text:
      'Rób swoje. Sprawdzenie polecanego piłkarza jest złożonym procesem. W naszym teamie zajmuje się tym 14 wyszkolonych skautów.',
  },
  {
    title: 'pieniądze',
    icon: <MoneyIcon color="inherit" />,
    text:
      'Oszczędność i inwestycja. Koszty niższe, niż utrzymanie jednego pracownika i potencjalny wzrost wartości w postaci utalentowanych piłkarzy. ',
  },
  {
    title: 'baza danych',
    icon: <DatabaseIcon color="inherit" />,
    text:
      'Analiza tworzy przewagę. Kompleksowa i usystematyzowana wiedza minimalizuje ryzyko nietrafionego transferu.',
  },
  {
    title: 'skauting na zlecenie',
    icon: <ScoutingIcon color="inherit" />,
    text:
      'Weryfikuj polecenia. Wskaż nazwisko, a otrzymasz maksimum informacji o wybranym zawodniku.',
  },
];

type ClubData = {
  name: string;
  logo: string;
};

export type Transfer = {
  player: {
    name: string;
    image: string;
  };
  from: ClubData;
  to: ClubData;
  reportLink: string;
};

export const transfers: Transfer[] = [
  {
    player: {
      name: 'Adam Żak',
      image: zakPhoto,
    },
    from: {
      name: 'Polonia Bytom',
      logo: bytomLogo,
    },
    to: {
      name: 'Odra Opole',
      logo: odraLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1IsRkdUEYIBXvt6zCjn_kmafVafUC49s_/view?usp=sharing',
  },
  {
    player: {
      name: 'Maksymilian Tkocz',
      image: tkoczPhoto,
    },
    from: {
      name: 'Podhale Nowy Targ',
      logo: podhaleLogo,
    },
    to: {
      name: 'Odra Opole',
      logo: odraLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1k161cG--8hZaMNO2qf7bfUMDsQmI3UNi/view?usp=sharing',
  },
  {
    player: {
      name: 'Kajetan Szmyt',
      image: szmytPhoto,
    },
    from: {
      name: 'Nielba Wągrowiec',
      logo: nielbaLogo,
    },
    to: {
      name: 'Górnik Polkowice',
      logo: polkowiceLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1Z9uArxzOJ2_T02K3Zc7Rk7mR82qT8keV/view?usp=sharing',
  },
  {
    player: {
      name: 'Jakub Sypek',
      image: sypekPhoto,
    },
    from: {
      name: 'Zagłębie II Lubin',
      logo: lubinLogo,
    },
    to: {
      name: 'Górnik Polkowice',
      logo: polkowiceLogo,
    },
    reportLink:
      'https://drive.google.com/file/d/1h5Or6CBbd-lOJKcOKoEUNyCSlwsIj2gB/view?usp=sharing',
  },
];

export type Recommendation = {
  player: string;
  from: string;
  to: string;
  reportLink: string;
};

export const recommendations: Recommendation[] = [
  {
    player: 'Mateusz Łęgowski',
    from: 'Pogoń II Szczecin',
    to: 'Pogoń Szczecin',
    reportLink:
      'https://drive.google.com/file/d/1P7NWJhQYm2UYbe6GaKOBt4MSKEzFX4Qk/view?usp=sharing',
  },
  {
    player: 'Kacper Karasek',
    from: 'Unia Skierniewice',
    to: 'Widzew Łódź',
    reportLink:
      'https://drive.google.com/file/d/11bgNRXMaWDE4rBm0SupATcAaiGgEAPcy/view?usp=sharing',
  },
  {
    player: 'Szymon Szymański',
    from: 'Rekord Bielsko-Biała',
    to: 'Skra Częstochowa',
    reportLink:
      'https://drive.google.com/file/d/1xoSWT_0LXuoDkXJ_NyBcKl0r-DBo-kes/view?usp=sharing',
  },
  {
    player: 'Andrzej Trubeha',
    from: 'Legionovia Legionowo',
    to: 'Jagiellonia Białystok',
    reportLink:
      'https://drive.google.com/file/d/1-X62MjyYVvhC3HNDWgYDliGe0bTIuL5A/view?usp=sharing',
  },
  {
    player: 'Filip Arak',
    from: 'Błonianka Błonie',
    to: 'Skra Częstochowa',
    reportLink:
      'https://drive.google.com/file/d/1JVxPr-KTjdX9jMBTYBWLjTQu5jOceSiW/view?usp=sharing',
  },
  {
    player: 'Bartosz Baranowicz',
    from: 'Górnik II Zabrze',
    to: 'Skra Częstochowa',
    reportLink:
      'https://drive.google.com/file/d/1EzHQbopGGoIC-aWn5YrIjtvupsr4L1UI/view?usp=sharing',
  },
];

export const mainPricing = {
  price: '1199 pln',
  features: [
    { title: 'Analiza potrzeb klubu', value: true },
    { title: 'Dostosowanie szablonu raportu do wymagań', value: true },
    { title: 'Dostęp do aplikacji skatuingowej', value: true },
    { title: 'Budowanie bazy skautingowej klubu', value: true },
    { title: 'Dostęp do statystycznych baz danych', value: true },
    { title: 'Zlecanie obserwacji konkretnych zawodników', value: true },
    { title: '4 skautów dedykowanych dla klubu', value: true },
    { title: '1 szef działu skautingu', value: true },
    {
      title: 'Możliwość obserwacji wszystkich lig PL i zagranicznych',
      value: true,
    },
  ],
};

export const historicalDataPricing = {
  price: 'Zgłoś się po wycenę',
  features: [
    { title: 'Dostęp do notatek i raportów z sezonu 19/20', value: true },
    { title: 'Dostęp do notatek i raportów z sezonu 20/21', value: true },
  ],
};
