import AccountCircle from '@material-ui/icons/AccountCircle';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Security from '@material-ui/icons/Security';
import SportsSoccer from '@material-ui/icons/SportsSoccer';
import Assignment from '@material-ui/icons/Assignment';
import Assessment from '@material-ui/icons/Assessment';
import { NavLinkProps } from './types';

export const basicNavElements: NavLinkProps[] = [
  {
    Icon: AccountCircle,
    text: 'Mój profil',
    link: '/account',
  },
  {
    Icon: DirectionsRun,
    text: 'Zawodnicy',
    link: '/players',
  },
  {
    Icon: Security,
    text: 'Kluby',
    link: '/clubs',
  },
  {
    Icon: SportsSoccer,
    text: 'Mecze',
    link: '/matches',
  },
  {
    Icon: Assessment,
    text: 'Raporty',
    link: '/reports',
  },
];

export const extendedNavElements = [
  ...basicNavElements,
  {
    Icon: Assignment,
    text: 'Zlecenia',
    link: '/orders',
  },
];
