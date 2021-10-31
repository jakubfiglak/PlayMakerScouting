import { ReactNode } from 'react';
import {
  Storage as DatabaseIcon,
  Check as RecommendationsIcon,
  Assessment as ReportsIcon,
  Note as NotesIcon,
} from '@material-ui/icons';

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
