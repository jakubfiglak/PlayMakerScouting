import { ReactNode } from 'react';
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

export type Value = {
  number: string;
  title: string;
  icon: ReactNode;
  values: string[];
};

export const values: Value[] = [
  {
    number: '01',
    title: 'Analiza danych',
    icon: <DatabaseIcon />,
    values: [
      'Określ zapotrzebowanie kadrowe',
      'Dostarczamy kompletne dane statystyczne zawodników wraz z profilami transfermarkt',
      'Szybko i sprawnie filtruj bazę według rocznika, pozycji, ligi, regionu ',
    ],
  },
  {
    number: '02',
    title: 'Notatki',
    icon: <NotesIcon />,
    values: [
      'Tworzymy krótkie notatki o każdym zawodniku, który jest zgodny z kryteriami obserwacji',
      'Zawężamy listę do najlepszych na wskazanych pozycjach',
    ],
  },
  {
    number: '03',
    title: 'Raporty',
    icon: <ReportsIcon />,
    values: [
      'Arkusz obserwacyjny dopasowany do potrzeb klubu',
      'Obserwujemy konkretne nazwiska na życzenie',
      'Tworzymy raporty o wyselekcjonowanych zawodnikach',
    ],
  },
  {
    number: '04',
    title: 'Rekomendacje',
    icon: <RecommendationsIcon />,
    values: [
      'Regularny kontakt i dopasowanie do zmian kadrowych',
      'Przed każdym oknem transferowym dostarczamy okresowy raport podsumowujący',
    ],
  },
];

export type Advantage = {
  title: string;
  icon: ReactNode;
  text: string;
};

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
  },
];
